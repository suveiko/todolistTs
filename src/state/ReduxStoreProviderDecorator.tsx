import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'

import {AppRootState} from "./store";

import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', completed: true},
            {id: v1(), title: 'JS', completed: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', completed: true},
            {id: v1(), title: 'React Book', completed: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) =>
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
