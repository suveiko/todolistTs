import {combineReducers, compose, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducer, composeEnhancers());


// @ts-ignore
window.store = store