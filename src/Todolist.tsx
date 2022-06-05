import React from 'react';

import {FilterValuesType} from './App';
import {Checkbox} from "./components/Checkbox";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

type TaskType = {
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

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(props.toDoListId, title)
    const removeToDoListHandler = () => props.removeToDoList(props.toDoListId)
    const onChangeHandlerCheck = (toDoId: string, tId: string, event: boolean) => {
        props.changeTaskStatus(toDoId, tId, event);
    }
    const onClickHandler = (toDoId: string, tId: string) => props.removeTask(toDoId, tId)
    const onAllClickHandler = () => props.changeFilter(props.toDoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.toDoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.toDoListId, "completed");
    const changeTodoListTitle = (title: string) => {
        props.changeTodolistTitle(title, props.toDoListId)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
            <button onClick={removeToDoListHandler}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map(t => {
                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(t.id, title, props.toDoListId)
                }
                return (
                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <button onClick={() => onClickHandler(props.toDoListId, t.id)}>x</button>
                        <Checkbox
                            callBack={(isDone) => onChangeHandlerCheck(props.toDoListId, t.id, isDone)}
                            isDone={t.isDone}
                        />
                        <EditableSpan
                            updateTitle={changeTaskTitle}
                            title={t.title}
                        />
                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
