import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";

import {FilterValuesType} from './App';

import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Tasks} from "./components/Tasks";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    toDoListId: string
    filter: FilterValuesType

    changeFilter: (toDoId: string, value: FilterValuesType) => void
    removeToDoList: (toDoId: string) => void
    changeTodolistTitle: (title: string, id: string) => void
}


export const Todolist = React.memo(({
                                        changeFilter, filter,
                                        toDoListId, removeToDoList,
                                        changeTodolistTitle, ...p
                                    }: PropsType) => {

    const dispatch = useDispatch()
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[toDoListId])

    if (filter === "active") tasks = tasks.filter(t => !t.isDone);
    if (filter === "completed") tasks = tasks.filter(t => t.isDone);


    const changeTodoListTitle = useCallback((title: string) => {
        changeTodolistTitle(title, toDoListId)
    }, [toDoListId])
    const removeToDoListHandler = () => {
        removeToDoList(toDoListId)
    }

    const onAllClickHandler = useCallback(() => {
        changeFilter(toDoListId, "all")
    }, [changeFilter, toDoListId])
    const onActiveClickHandler = useCallback(() => {
        changeFilter(toDoListId, "active")
    }, [changeFilter, toDoListId])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter(toDoListId, "completed")
    }, [changeFilter, toDoListId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(toDoListId, title))
    }, [dispatch])

    const itemTasks = tasks.map(({id, isDone, title}) => {
        return <Tasks
            key={`${id}-${toDoListId}`}
            id={id}
            isDone={isDone}
            title={title}
            todoListId={toDoListId}
        />
    })

    return (
        <div>
            <h3>
                <EditableSpan title={p.title} updateTitle={changeTodoListTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={addTask}/>
            <ul>
                {itemTasks}
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    variant={filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    variant={filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
})

