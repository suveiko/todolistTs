import React from 'react';

import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {FilterValuesType} from './App';
import CheckboxForm from "./components/CheckboxForm";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (toDoId: string, taskId: string) => void
    changeFilter: (toDoId: string, value: FilterValuesType) => void
    addTask: (toDoId: string, title: string) => void
    changeTaskStatus: (toDoId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    toDoListId: string
    removeToDoList: (toDoId: string) => void
    changeTodolistTitle: (title: string, id: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoId: string) => void
}

function Todolist({
                      tasks,
                      removeTask,
                      changeFilter,
                      changeTaskStatus,
                      filter,
                      toDoListId,
                      removeToDoList,
                      changeTodolistTitle,
                      addTask,
                      changeTaskTitle,
                      ...p
                  }: PropsType) {

    const addTaskHandler = (title: string) => addTask(toDoListId, title)
    const removeToDoListHandler = () => removeToDoList(toDoListId)
    const onChangeHandlerCheck = (toDoId: string, tId: string, event: boolean) => {
        changeTaskStatus(toDoId, tId, event);
    }
    const onClickHandler = (toDoId: string, tId: string) => removeTask(toDoId, tId)
    const onAllClickHandler = () => changeFilter(toDoListId, "all");
    const onActiveClickHandler = () => changeFilter(toDoListId, "active");
    const onCompletedClickHandler = () => changeFilter(toDoListId, "completed");
    const changeTodoListTitle = (title: string) => {
        changeTodolistTitle(title, toDoListId)
    }

    const itemTasks = tasks.map(({id, isDone, title}) => {
        const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, title, toDoListId)
        return (
            <li key={id} className={isDone ? "is-done" : ""}>

                <CheckboxForm
                    callBack={(isDone) => onChangeHandlerCheck(toDoListId, id, isDone)}
                    isDone={isDone}
                />
                <EditableSpan
                    updateTitle={changeTaskTitleHandler}
                    title={title}
                />
                <IconButton onClick={() => onClickHandler(toDoListId, id)}>
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
            <AddItemForm addTask={addTaskHandler}/>
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
