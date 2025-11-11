import { prisma } from '../db.js';
import { Request, Response, NextFunction } from 'express';

// @desc   Get all todos
// @route  GET /api/todos
// @access Public
export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(todos);
}

// @desc   Get todo by ID
// @route  GET /api/todos/:id
// @access Public
export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const todo = await prisma.todo.findUniqueOrThrow({
        where: { id: id }
    });
    return res.status(200).json(todo);
}

// @desc   Create a new todo
// @route  POST /api/todos
// @access Public
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
        data: {
            title: title,
        }
    });
    return res.status(201).json(newTodo);
}

// @desc   Overwrite a todo
// @route  PUT /api/todos/:id
// @access Public
export const overwriteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    const overwrittedTodo = await prisma.todo.update({
        where: { id: id },
        data: {
            title: title,
            completed: completed,
        }
    });
    return res.status(200).json(overwrittedTodo);
}

// @desc   Update a todo
// @route  PATCH /api/todos/:id
// @access Public
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, completed } = req.body;
    const overwrittedTodo = await prisma.todo.update({
        where: { id: id },
        data: {
            title: title,
            completed: completed,
        }
    });
    return res.status(200).json(overwrittedTodo);
}

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
// @access Public
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await prisma.todo.delete({
        where: { id: id }
    });
    return res.status(204).send();
} 