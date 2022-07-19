import React, {useEffect, useState} from 'react'
import {TodolistAPI} from "../api/todolistAPI";


export default {
    title: 'API/Todolist'
}


export const GetTodoLists = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        TodolistAPI
            .getTodoLists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        TodolistAPI
            .createTodoList('Hello')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        TodolistAPI
            .deleteTodoList('3e33bfc6-5a6b-4de8-b5cd-cdc67b424e5f')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        TodolistAPI
            .updateTodoListTitle('42451a1b-c17c-40e3-b516-c5b8654151a6', 'Like milk')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

