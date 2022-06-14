import {TasksStateType} from "../App";
import {v1} from "uuid";

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
type ActionType = RemoveTaskActionType | AddTaskActionType


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

    }
}

export const RemoveTaskAC = (todoId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoId: todoId, id: id}
}
export const AddTaskAC = (todoId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todoId: todoId, title: title}
}