export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

let todos: Todo[] = [
    { id: 1, title: "Sample Todo", completed: false, createdAt: new Date() },
    { id: 2, title: "Another Todo", completed: true, createdAt: new Date() },
    { id: 3, title: "Learn TypeScript", completed: false, createdAt: new Date() },
    { id: 4, title: "Build an API", completed: false, createdAt: new Date() },
    { id: 5, title: "Write Tests", completed: true, createdAt: new Date() }
];

let nextId = 6;

export function getAllTodos(): Todo[] {
    return todos;
}

export function getTodoById(id: number): Todo | undefined {
    return todos.find(todo => todo.id === id);
}

export function createTodo(title: string): Todo {
    const newTodo: Todo = {
        id: nextId++,
        title,
        completed: false,
        createdAt: new Date()
    };
    todos.push(newTodo);
    return newTodo;
}

export function updateTodo(id: number, title: string, completed: boolean): Todo | undefined {
    const todo = getTodoById(id);


    if (todo) {
        todo.title = title? title : todo.title;
        todo.completed = typeof completed === 'boolean'? completed : todo.completed;
    }
    return todo;
}

export function overwriteTodo(id: number, title: string, completed: boolean): Todo | undefined {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        return undefined;
    }
    const updatedTodo: Todo = {
        id,
        title,
        completed,
        createdAt: todos[index].createdAt
    };
    todos[index] = updatedTodo;
    return updatedTodo;

}

export function deleteTodo(id: number): boolean {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        return true;
    }
    return false;
}