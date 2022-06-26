import {v1} from "uuid";

import {TasksStateType} from '../AppWithRedux'
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


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
type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.id)}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]}
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
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (todoId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todoId, id: taskId}
}
export const addTaskAC = (todoId: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', todoId, title}
}
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean): ChangeStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', todoId, id: taskId, isDone}
}
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todoId, id: taskId, title: newTitle}
}