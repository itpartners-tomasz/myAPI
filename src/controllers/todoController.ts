import * as todoService from '../data/todo.js';
import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '../utils/errorWithStatus.js';

export function getAllTodos(req: Request, res: Response, next: NextFunction) {
    res.status(200).json(todoService.getAllTodos());
}

export function getTodoById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return next(new ErrorWithStatus('Invalid ID format', 400));
    }
    const todo = todoService.getTodoById(id);
    if (!todo) {
        return next(new ErrorWithStatus('Todo not found', 404));
    }
    res.status(200).json(todo);
}
export function createTodo(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    if (typeof title !== 'string' || title.trim() === '') {
        return next(new ErrorWithStatus('Invalid todo data', 400));
    }
    const newTodo = todoService.createTodo(title);
    res.status(201).json(newTodo);
}

export function overwriteTodo(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    if (isNaN(id) || typeof title !== 'string' || title.trim() === '' || typeof completed !== 'boolean') {
        return next(new ErrorWithStatus('Invalid data', 400));
    }
    const overwrittedTodo = todoService.overwriteTodo(id, title, completed);
    if (!overwrittedTodo) {
        return next(new ErrorWithStatus('Todo not found', 404));
    }
    res.status(200).json(overwrittedTodo);
}

export function updateTodo(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    if (title === undefined && completed === undefined) {
        return next(new ErrorWithStatus('No data provided for update', 400));
    }
    if (isNaN(id) || (title !== undefined && (typeof title !== 'string' || title.trim() === '')) || (completed !== undefined && typeof completed !== 'boolean')) {
        return next(new ErrorWithStatus('Invalid data', 400));
    }
    const updatedTodo = todoService.updateTodo(id, title , completed);
    if (!updatedTodo) {
        return next(new ErrorWithStatus('Todo not found', 404));
    }
    res.status(200).json(updatedTodo);
}

export function deleteTodo(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return next(new ErrorWithStatus('Invalid ID format', 400));
    }
    const deleted = todoService.deleteTodo(id);
    if (!deleted) {
        return next(new ErrorWithStatus('Todo not found', 404));
    }
    res.status(204).send();
}  