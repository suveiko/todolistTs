import React from 'react';

import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {FilterValuesType} from './AppWithRedux';

import CheckboxForm from "./components/CheckboxForm";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


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

function Todolist({
                      changeFilter, filter,
                      toDoListId, removeToDoList, changeTodolistTitle, ...p
                  }: PropsType) {


    const dispatch = useDispatch()
    let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[toDoListId])

    if (filter === "active") tasks = tasks.filter(t => !t.isDone);
    if (filter === "completed") tasks = tasks.filter(t => t.isDone);


    const changeTodoListTitle = (title: string) => {
        changeTodolistTitle(title, toDoListId)
    }
    const removeToDoListHandler = () => removeToDoList(toDoListId)

    const onAllClickHandler = () => changeFilter(toDoListId, "all");
    const onActiveClickHandler = () => changeFilter(toDoListId, "active");
    const onCompletedClickHandler = () => changeFilter(toDoListId, "completed");

    const itemTasks = tasks.map(({id, isDone, title}) => {
        const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC(toDoListId, id, title))
        return (
            <li key={id} className={isDone ? "is-done" : ""}>
                <CheckboxForm
                    callBack={(isDone) => dispatch(changeTaskStatusAC(toDoListId, id, isDone))}
                    isDone={isDone}
                />
                <EditableSpan
                    updateTitle={changeTaskTitleHandler}
                    title={title}
                />
                <IconButton onClick={() => dispatch(removeTaskAC(toDoListId, id))}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={p.title} updateTitle={changeTodoListTitle}/>
                <IconButton onClick={removeToDoListHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={(title: string) => dispatch(addTaskAC(toDoListId, title))}/>
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
}

export default Todolist
