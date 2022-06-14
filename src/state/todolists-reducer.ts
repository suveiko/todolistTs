import {FilterValuesType, ToDoListsType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeTodoListFilterActionType

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todoListsReducer = (state: ToDoListsType[], action: ActionType): ToDoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.id ? {id: s.id, title: action.title, filter: 'all'} : s)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todoId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoId}
}
export const AddTodoListAC = (newTitle: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: newTitle}
}
export const ChangeTodoListAC = (todoId: string, newTitle: string): ChangeTodoListActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoId, title: newTitle}
}
export const ChangeTodoListFilterAC = (todoId: string, newFilter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoId, filter: newFilter}
}
