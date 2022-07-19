import React, {useEffect, useState} from 'react'

import {TodolistAPI, TodoListType} from "../api/todolistAPI";


export default {
    title: 'API/Todolist'
}


export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[]>([])

    useEffect(() => {
        TodolistAPI
            .getTodoLists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState({})
    const [title, setTitle] = useState<string>('')

    const createTodoList = () => TodolistAPI
        .createTodoList(title)
        .then(res => setState(res.data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Todolist title'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <button onClick={createTodoList}>Create todoList</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState({})
    const [todoListId, setTodoListId] = useState<string>('')


    const deleteTodoList = () => TodolistAPI
        .deleteTodoList(todoListId)
        .then(res => setState(res.data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Todolist id'
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <button onClick={deleteTodoList}>Delete todoList</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState({})
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const updateTodoListTitle = () => TodolistAPI
        .updateTodoListTitle(todoListId, title)
        .then(res => setState(res.data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Todolist title'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <input
                placeholder='Todolist id'
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <button onClick={updateTodoListTitle}>Update todolist title</button>
        </div>
    </div>
}

