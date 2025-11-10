import { prisma } from '../db.js';
import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../utils/errorWithStatus.js';

// @desc   Get all todos
// @route  GET /api/todos
// @access Public
export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json(todos);
    }
    catch (error) {
        return next(error);
    }
}

// @desc   Get todo by ID
// @route  GET /api/todos/:id
// @access Public
export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id || id.trim() === '') {
        return next(new ErrorWithStatus('ID parameter is required', 400));
    }
    try {
        const todo = await prisma.todo.findUniqueOrThrow({
            where: { id: id }
        });
        return res.status(200).json(todo);
    } catch (error) {
        return next(error);
    }

}

// @desc   Create a new todo
// @route  POST /api/todos
// @access Public
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    if (typeof title !== 'string' || title.trim() === '') {
        return next(new ErrorWithStatus('Invalid todo data', 400));
    }
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title: title,
            }
        });
        return res.status(201).json(newTodo);
    } catch (error) {
        return next(error);
    }
}

// @desc   Overwrite a todo
// @route  PUT /api/todos/:id
// @access Public
export const overwriteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id || id.trim() === '') {
        return next(new ErrorWithStatus('ID parameter is required', 400));
    }
    const { title, completed } = req.body;
    if (typeof title !== 'string' || title.trim() === '' || typeof completed !== 'boolean') {
        return next(new ErrorWithStatus('Invalid data', 400));
    }
    try {
        const overwrittedTodo = await prisma.todo.update({
            where: { id: id },
            data: {
                title: title,
                completed: completed,
            }
        });
        return res.status(200).json(overwrittedTodo);
    } catch (error) {
        return next(error);
    }

}

// @desc   Update a todo
// @route  PATCH /api/todos/:id
// @access Public
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id || id.trim() === '') {
        return next(new ErrorWithStatus('ID parameter is required', 400));
    }
    const { title, completed } = req.body;
    if (title === undefined && completed === undefined) {
        return next(new ErrorWithStatus('No data provided for update', 400));
    }
    if ((title !== undefined && (typeof title !== 'string' || title.trim() === '')) || (completed !== undefined && typeof completed !== 'boolean')) {
        return next(new ErrorWithStatus('Invalid data', 400));
    }
    try {
        const overwrittedTodo = await prisma.todo.update({
            where: { id: id },
            data: {
                title: title,
                completed: completed,
            }
        });
        return res.status(200).json(overwrittedTodo);
    } catch (error) {
        return next(error);
    }
}

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
// @access Public
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id || id.trim() === '') {
        return next(new ErrorWithStatus('ID parameter is required', 400));
    }
    try {
        await prisma.todo.delete({
            where: { id: id }
        });
        return res.status(204).send();
    }
    catch (error) {
        return next(error);
    }
} 