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

export const Todolist = ({name, tasks, deleteTask, addTask, changeStatus, changeFilter, filter}: TodolistPropsType) => {

    const [newTitle, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = (value: FilterType) => changeFilter(value)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle.trim())
            setTitle('')
        } else {
            setError('Field is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter' && newTitle.trim() !== '') {
            addTaskHandler()
        } else {
            setError('Field is required')
        }
    }

    return (
        <div>
            <h3>{name}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler}
                       onKeyUp={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map(({id, isDone, title}) => {
                    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeStatus(id, e.currentTarget.checked)
                    }
                    const deleteTaskButton = () => deleteTask(id)
                    return (
                        <li key={id} className={isDone ? 'is-done' : ''}>
                            <button onClick={deleteTaskButton}>X</button>
                            <input
                                type="checkbox"
                                onChange={onChangeInputCheckedHandler}
                                checked={isDone}
                            />
                            <span>{title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'All' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('All')}>All
                </button>
                <button className={filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Active')}>Active
                </button>
                <button className={filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}