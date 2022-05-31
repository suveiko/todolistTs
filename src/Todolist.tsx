import React from "react";
import {FilterType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css'

type TodolistPropsType = {
    name: string
    tasks: InArrayType[]
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (newTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}
export type InArrayType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (p: TodolistPropsType) => {

    const [newTitle, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = (value: FilterType) => p.changeFilter(value)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            p.addTask(newTitle.trim())
            setTitle('')
        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && newTitle.trim() !== '') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{p.name}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {p.tasks.map(t => {
                    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        p.changeStatus(t.id, e.currentTarget.checked)
                    }
                    const deleteTaskButton = () => p.deleteTask(t.id)
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <button onClick={deleteTaskButton}>X</button>
                            <input
                                type="checkbox"
                                onChange={onChangeInputCheckedHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={p.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('All')}>All
                </button>
                <button className={p.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Active')}>Active
                </button>
                <button className={p.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}