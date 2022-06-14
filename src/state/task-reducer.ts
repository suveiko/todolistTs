import {TasksStateType} from "../App";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todoId: string
}

export const taskReducer = (state: TasksStateType, action: RemoveTaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter(t => t.id !== action.id)}
    }
}

export const RemoveTaskAC = (todoId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoId: todoId, id: id}
}