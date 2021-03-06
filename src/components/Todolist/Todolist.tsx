import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {AppRootState} from "../../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Tasks} from "../Tasks/Tasks";

import {FilterValuesType} from "../../state/todolists-reducer";

import {TaskType} from "../../api/types/apiTypes";


type PropsType = {
    newTitle: string
    toDoListId: string
    filter: FilterValuesType

    changeFilter: (toDoId: string, value: FilterValuesType) => void
    removeToDoList: (toDoId: string) => void
    changeTodolistTitle: (title: string, id: string) => void
}


export const Todolist = React.memo(({
                                        changeFilter, filter,
                                        toDoListId, removeToDoList,
                                        changeTodolistTitle, newTitle
                                    }: PropsType) => {

    const dispatch = useDispatch()
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[toDoListId])

    if (filter === "active") tasks = tasks.filter(t => !t.completed);
    if (filter === "completed") tasks = tasks.filter(t => t.completed);


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

    const itemTasks = tasks.map(({id, completed, title}) => {

        const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC(toDoListId, id, title))
        const changeCheckBox = (isDone: boolean) => dispatch(changeTaskStatusAC(toDoListId, id, isDone))
        const removeTask = () => dispatch(removeTaskAC(toDoListId, id))

        return <Tasks
            key={`${id}-${toDoListId}`}
            id={id}
            completed={completed}
            title={title}
            changeTaskTitleHandler={changeTaskTitleHandler}
            changeCheckBox={changeCheckBox}
            removeTask={removeTask}
        />
    })

    return (
        <div>
            <h3>
                <EditableSpan title={newTitle} updateTitle={changeTodoListTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
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

