import {v1} from "uuid";

import {TasksStateType} from "../App";


type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | ChangeTaskTitleActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todoId: string
    title: string
}
type ChangeStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoId: string
    id: string
    isDone: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoId: string
    id: string
    title: string
}


export const taskReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.id ? {...t, title: action.title} : t)
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTaskAC = (todoId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoId: todoId, id: taskId}
}
export const AddTaskAC = (todoId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoId: todoId, title: title}
}
export const ChangeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean): ChangeStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoId: todoId, id: taskId, isDone: isDone}
}
export const ChangeTaskTitleAC = (todoId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoId: todoId, id: taskId, title: newTitle}
}