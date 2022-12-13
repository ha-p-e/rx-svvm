import { createStore } from "../svvm";

export interface TodoItem {
    key: string;
    description: string;
    completed: boolean;
}

export const [addTodoText, setAddTodoText, addTodoText$] = createStore("");
export const [todoList, setTodoList, todoList$] = createStore<TodoItem[]>([]);
