import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

type TodolistPropsType = {
    name: string
    tasks: InArrayType[]
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
}

export type InArrayType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (p: TodolistPropsType) => {
    const [newTitle, setTitle] = useState('')
    const onClickButtonHandler = (value: FilterType) => {
        p.changeFilter(value)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        p.addTask(newTitle)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{p.name}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler} onKeyUp={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {p.tasks.map(t => {
                    const deleteTaskButton = () => p.deleteTask(t.id)
                    return (
                        <li key={t.id}>
                            <button onClick={deleteTaskButton}>X</button>
                            <input type="checkbox" checked={t.isDone}/>
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