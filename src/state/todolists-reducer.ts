import {ToDoListsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
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