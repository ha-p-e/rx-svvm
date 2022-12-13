import { map, Observable, of } from "rxjs";
import {
    setTodoList,
    addTodoText,
    setAddTodoText,
    addTodoText$,
    todoList$,
    TodoItem,
} from "./store";
import { nanoid } from "nanoid";

export interface AddTodoViewModel {
    addTodoText: string;
    setAddTodoText: (text: string) => void;
    addTodo: () => void;
}

export interface TodoItemViewModel {
    item: TodoItem;
    delete: () => void;
    toggleComplete: () => void;
}

export interface TodoListViewModel {
    todoList: TodoItem[];
    setTodoList: (list: TodoItem[]) => void;
}

export function createAddTodoViewModel(): Observable<AddTodoViewModel> {
    const addTodo = () => {
        setTodoList(todoList => [
            ...todoList,
            { key: nanoid(), description: addTodoText(), completed: false },
        ]);
        setAddTodoText("");
    };
    return addTodoText$.pipe(
        map(addTodoText => ({ addTodoText, setAddTodoText, addTodo }))
    );
}

export function createTodoListViewModel(): Observable<TodoListViewModel> {
    return todoList$.pipe(map(todoList => ({ todoList, setTodoList })));
}

export function createTodoItemViewModel(
    item: TodoItem
): Observable<TodoItemViewModel> {
    const del = () =>
        setTodoList(todoList => todoList.filter(i => i.key !== item.key));
    const check = () =>
        setTodoList(todoList =>
            todoList.map(i =>
                i.key === item.key ? { ...item, completed: !item.completed } : i
            )
        );
    return of({ item: item, delete: del, toggleComplete: check });
}
