import {v1} from "uuid";

import {TasksStateType} from '../app/App'
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, completed: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, completed: action.completed} : t)
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
export const changeTaskStatusAC = (todoListId: string, taskId: string, completed: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, completed} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title} as const
}


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListAT
    | RemoveTodoListAT