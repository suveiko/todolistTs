import {v1} from "uuid";

import {TasksStateType} from '../AppWithRedux'
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
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
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
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

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todoListId, taskId} as const
}
export const addTaskAC = (todoListId: string, title: string) => {
    return {type: 'ADD-TASK', todoListId, title} as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title} as const
}