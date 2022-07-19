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

    useEffect(() => {
        TodolistAPI
            .createTodoList('Hello')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        TodolistAPI
            .deleteTodoList('86cab033-11ba-4591-8cfc-5fe9f762fe23')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        TodolistAPI
            .updateTodoListTitle('3ee813c7-6d56-41ff-a3bc-01097ca32131', 'Like milk')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

