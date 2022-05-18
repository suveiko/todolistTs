import React from "react";
import {FilterType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    name: string
    tasks: InArrayType[]
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}
export type InArrayType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (p: TodolistPropsType) => {
    const [newTitle, setTitle] = useState('')
    const onClickButtonHandler = (value: FilterType) => p.changeFilter(value)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        p.addTask(newTitle)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTitle.trim() !== '') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{p.name}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler} onKeyUp={onKeyPressHandler}/>
                <button disabled={newTitle.trim() === ''} onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {p.tasks.map(t => {
                    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        p.changeStatus(t.id, e.currentTarget.checked)
                    }
                    const deleteTaskButton = () => p.deleteTask(t.id)
                    return (
                        <li key={t.id}>
                            <button onClick={deleteTaskButton}>X</button>
                            <input
                                type="checkbox"
                                onChange={onChangeInputCheckedHandler}
                                checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickButtonHandler('All')}>All</button>
                <button onClick={() => onClickButtonHandler('Active')}>Active</button>
                <button onClick={() => onClickButtonHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}