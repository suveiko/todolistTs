import {v1} from "uuid";

import {FilterValuesType, TodoListsType} from "../app/App";


export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListAT = ReturnType<typeof changeTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListAT
    | ChangeTodoListFilterAT


const initialState: TodoListsType[] = []


export const todoListsReducer = (state: TodoListsType[] = initialState, action: ActionType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todoListId)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.todoListId ? {id: s.id, title: action.title, filter: 'all'} : s)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(s => s.id === action.todoListId ? {...s, filter: action.filter} : s)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string) => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()} as const
}
export const changeTodoListAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, title} as const
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter} as const
}
