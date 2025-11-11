import express from 'express';
import * as todoController from '../controllers/todoController.js';
import { validate } from '../middleware/validate.js';
import * as todoSchemas from '../schemas/todoSchema.js';

const router = express.Router();


router.get('/', todoController.getAllTodos);

router.get('/:id', validate(todoSchemas.getTodoSchema), todoController.getTodoById);

router.post('/', validate(todoSchemas.createTodoSchema), todoController.createTodo);

router.put('/:id', validate(todoSchemas.overwriteTodoSchema), todoController.overwriteTodo);
router.patch('/:id', validate(todoSchemas.updateTodoSchema), todoController.updateTodo);

router.delete('/:id', validate(todoSchemas.deleteTodoSchema), todoController.deleteTodo);

export default router;