import {instance} from "./axios";


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}


export const TodolistAPI = {
    getTodoLists: () => instance
        .get<TodoListType[]>('todo-lists'),

    createTodoList: (title: string) => instance
        .post<ResponseType<{ item: TodoListType }>>('todo-lists', {title}),

    deleteTodoList: (id: string) => instance
        .delete<ResponseType>(`todo-lists/${id}`),

    updateTodoListTitle: (id: string, title: string) => instance
        .put<ResponseType>(`todo-lists/${id}`, {title})
}