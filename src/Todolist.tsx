import React from "react";
import {FilterType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css'

type TodolistPropsType = {
    name: string
    tasks: InArrayType[]
    deleteTask: (id: string, todoId: string) => void
    changeFilter: (value: FilterType, todoId: string) => void
    addTask: (newTitle: string, todoId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoId: string) => void
    filter: FilterType
    tId: string
    removeTodo: (todoId: string) => void
}
export type InArrayType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             name, tasks, deleteTask, addTask, changeStatus, changeFilter, filter, tId, removeTodo
                         }: TodolistPropsType) => {

    const [newTitle, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = (value: FilterType, todoId: string) => changeFilter(value, todoId)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addTask(newTitle.trim(), tId)
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
    const removeTodoList = (todoId: string) => removeTodo(todoId)

    return (
        <div>
            <h3>{name}
                <button onClick={() => removeTodoList(tId)}>X</button>
            </h3>
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
                        changeStatus(id, e.currentTarget.checked, tId)
                    }
                    const deleteTaskButton = () => deleteTask(id, tId)
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
                        onClick={() => onClickButtonHandler('All', tId)}>All
                </button>
                <button className={filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Active', tId)}>Active
                </button>
                <button className={filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => onClickButtonHandler('Completed', tId)}>Completed
                </button>
            </div>
        </div>
    )
}