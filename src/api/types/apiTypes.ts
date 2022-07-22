export type TodoListType = {
    id: string
    title: string
    addedDate?: string
    order?: number
}
export type ResponseTypeTodolist<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}

export type TaskType = {
    description?: string
    title: string
    completed: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    id: string
    todoListId?: string
    order?: string
    addedDate?: string
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
export type ResponseTypeTask<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}