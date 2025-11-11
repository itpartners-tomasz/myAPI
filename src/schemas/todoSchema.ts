import { z } from 'zod';

const paramsWithIdSchema = z.object({
    params: z.object({
        id: z.cuid().min(25, "Incorrect ID format")
    })
});

const titleSchema = z.string({
    error: "Title is required and must be a string"
    })
    .min(3, {
        message: "Minimum 3 chars title is required"
    });

const completedSchema = z.boolean({
    error: "Completed must be a boolean"
});

export const createTodoSchema = z.object({
    body: z.object({
        title: titleSchema
    })
});

export const updateTodoSchema = paramsWithIdSchema.extend({
    body: z.object({
        title: titleSchema.optional(),
        completed: completedSchema.optional()
    })
        .refine((data) => data.title !== undefined || data.completed !== undefined, {
            message: "At least one of title or completed must be provided"
        })
});


export const overwriteTodoSchema = paramsWithIdSchema.extend({
    body: z.object({
        title: titleSchema,
        completed: completedSchema
    })
});

export const getTodoSchema = paramsWithIdSchema;

export const deleteTodoSchema = paramsWithIdSchema;