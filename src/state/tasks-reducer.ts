import {v1} from "uuid";

import {TasksStateType, TodoListsType} from "../App";


type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    id: string
    todoId: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    todoId: string
    title: string
}
type ChangeStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todoId: string
    id: string
    isDone: boolean
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todoId: string
    id: string
    title: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST-ID'
    title: string
    todoListId: string
}
type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoId]:
                    [
                        {id: v1(), title: action.title, isDone: false},
                        ...state[action.todoId]
                    ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST-ID':
            const newTodoList: TodoListsType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return {
                ...state, [action.todoListId]: []
            }
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todoId, id: taskId}
}
export const addTaskAC = (todoId: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', todoId, title: title}
}
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean): ChangeStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todoId, id: taskId, isDone: isDone}
}
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todoId, id: taskId, title: newTitle}
}
export const addTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST-ID', title, todoListId: v1()}
}