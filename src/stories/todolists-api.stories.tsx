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
            .createTodoList()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        const todolistId = 'cd0f1b63-f32a-453b-bf3b-d74055aea2d5'

        TodolistAPI
            .deleteTodoList(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        const todolistId = '42451a1b-c17c-40e3-b516-c5b8654151a6'

        TodolistAPI
            .updateTodoListTitle(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

