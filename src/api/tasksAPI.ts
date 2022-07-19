import {instance} from "./axios";


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: string
    priority: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: string
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type GetTasksType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}


export const TasksAPI = {
    getTasks: (todoListId: string) => instance
        .get<GetTasksType>(`todo-lists/${todoListId}/tasks`),

    createTasks: (todoListId: string, title: string) => instance
        .post<ResponseType<{ item: TaskType[] }>>(`todo-lists/${todoListId}/tasks`, {title}),

    deleteTask: (todoListId: string, taskId: string) => instance
        .delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`),

    updateTask: (todoListId: string, taskId: string, data: UpdateTaskType) => instance
        .put<UpdateTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`, data)
}