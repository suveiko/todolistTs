import {v1} from "uuid";

import {FilterValuesType, TodoListsType} from "../App";


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListAT
    | ChangeTodoListFilterAT


export const todoListsReducer = (state: TodoListsType[], action: ActionType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.id ? {id: s.id, title: action.title, filter: 'all'} : s)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s)
        default:
            return state
    }
}

export const removeTodoListAC = (todoId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todoId}
}
export const addTodoListAC = (newTitle: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: newTitle, todoListId: v1()}
}
export const changeTodoListAC = (todoId: string, newTitle: string): ChangeTodoListAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoId, title: newTitle}
}
export const changeTodoListFilterAC = (todoId: string, newFilter: FilterValuesType): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoId, filter: newFilter}
}
