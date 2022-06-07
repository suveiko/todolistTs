import React from 'react';

import {FilterValuesType} from './App';

import Checkbox from "./components/Checkbox";
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
    const itemTasks = tasks.length ? tasks.map(({id, isDone, title}) => {
        const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, title, toDoListId)
        return (
            <li key={id} className={isDone ? "is-done" : ""}>
                <button onClick={() => onClickHandler(toDoListId, id)}>X</button>
                <Checkbox
                    callBack={(isDone) => onChangeHandlerCheck(toDoListId, id, isDone)}
                    isDone={isDone}
                />
                <EditableSpan
                    updateTitle={changeTaskTitleHandler}
                    title={title}
                />
            </li>
        )
    }) : <span>Add new task!</span>

    return (
        <div>
            <h3>
                <EditableSpan title={p.title} updateTitle={changeTodoListTitle}/>
                <button onClick={removeToDoListHandler}>X</button>
            </h3>
            <AddItemForm addTask={addTaskHandler}/>
            <ul>
                {itemTasks}
            </ul>
            <div>
                <button className={filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist
