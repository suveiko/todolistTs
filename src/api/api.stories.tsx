import React, {useEffect, useState} from 'react'

import {TaskApi, TodolistAPI} from "./api";
import {
    GetTasksType,
    ResponseTypeTask,
    ResponseTypeTodolist,
    TaskType,
    TodoListType,
    UpdateTaskType
} from "./types/apiTypes";


export default {
    title: 'API'
}


export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[]>([])

    useEffect(() => {
        TodolistAPI
            .getTodoLists()
            .then(data => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseTypeTodolist<{ item: TodoListType }> | null>(null)
    const [title, setTitle] = useState<string>('')

    const createTodoList = () => TodolistAPI
        .createTodoList(title)
        .then(data => setState(data))

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
    const [state, setState] = useState<ResponseTypeTodolist | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')


    const deleteTodoList = () => TodolistAPI
        .deleteTodoList(todoListId)
        .then(data => setState(data))

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
    const [state, setState] = useState<ResponseTypeTodolist | null>(null)
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const changeTodoListTitle = () => TodolistAPI
        .updateTodoListTitle(todoListId, title)
        .then(data => setState(data))

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
            <button onClick={changeTodoListTitle}>Update todolist title</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<GetTasksType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasks = () => TaskApi
        .getTasks(todoListId)
        .then(data => setState(data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder="TodoList id"
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<ResponseTypeTask<{ item: TaskType[] }> | null>(null)
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const createTask = () => TaskApi
        .createTasks(todoListId, title)
        .then(data => setState(data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Task title'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <input
                placeholder='Todolist id'
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <button onClick={createTask}>Change task title</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<ResponseTypeTask | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => TaskApi
        .deleteTask(todoListId, taskId)
        .then(data => setState(data))

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Todolist id'
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <input
                placeholder='Task id'
                value={taskId}
                onChange={e => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<UpdateTaskType | null>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const changeTaskTitle = () => {
        const model: UpdateTaskType = {
            title: title,
            description: '',
            completed: true,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        }

        TaskApi
            .updateTask(todoListId, taskId, model)
            .then(data => setState(data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder='Todolist id'
                value={todoListId}
                onChange={e => setTodoListId(e.currentTarget.value)}
            />
            <input
                placeholder='Task id'
                value={taskId}
                onChange={e => setTaskId(e.currentTarget.value)}
            />
            <input
                placeholder='Task title'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <button onClick={changeTaskTitle}>update</button>
        </div>
    </div>
}

