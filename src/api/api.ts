import axios from "axios";

import {
    GetTasksType,
    ResponseTypeTask,
    ResponseTypeTodolist,
    TaskType,
    TodoListType,
    UpdateTaskType
} from "./types/apiTypes";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "d109b0c8-ad95-4d03-855f-a4cafa3fa08d",
    },
})


export const TodolistAPI = {
    getTodoLists: () => instance
        .get<TodoListType[]>('todo-lists'),

    createTodoList: (title: string) => instance
        .post<ResponseTypeTodolist<{ item: TodoListType }>>('todo-lists', {title}),

    deleteTodoList: (id: string) => instance
        .delete<ResponseTypeTodolist>(`todo-lists/${id}`),

    updateTodoListTitle: (id: string, title: string) => instance
        .put<ResponseTypeTodolist>(`todo-lists/${id}`, {title})
}
export const TaskApi = {
    getTasks: (todoListId: string) => instance
        .get<GetTasksType>(`todo-lists/${todoListId}/tasks`),

    createTasks: (todoListId: string, title: string) => instance
        .post<ResponseTypeTask<{ item: TaskType[] }>>(`todo-lists/${todoListId}/tasks`, {title}),

    deleteTask: (todoListId: string, taskId: string) => instance
        .delete<ResponseTypeTask>(`todo-lists/${todoListId}/tasks/${taskId}`),

    updateTask: (todoListId: string, taskId: string, model: UpdateTaskType) => instance
        .put<UpdateTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
}

