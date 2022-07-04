import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

import {FilterValuesType} from './App';

import {CheckboxForm} from "./components/CheckboxForm";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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

    console.log('todolist is called')
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

type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
    todoListId: string
}

const Tasks = React.memo(({id, isDone, title, todoListId}: TasksPropsType) => {
    console.log('Tasks')
    const dispatch = useDispatch()

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, title))
    }, [todoListId, id, dispatch])
    const changeCheckBox = useCallback((isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, id, isDone))
    }, [todoListId, id, dispatch])

    return (
        <li key={id} className={isDone ? "is-done" : ""}>
            <CheckboxForm
                callBack={changeCheckBox}
                isDone={isDone}
            />
            <EditableSpan
                updateTitle={changeTaskTitleHandler}
                title={title}
            />
            <IconButton onClick={() => dispatch(removeTaskAC(todoListId, id))}>
                <Delete/>
            </IconButton>
        </li>
    )
})