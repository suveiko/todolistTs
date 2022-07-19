import React, {useState} from "react";

import {GetTasksType, TasksAPI, UpdateTaskType} from "../api/tasksAPI";


export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<GetTasksType>()
    const [todoListId, setTodoListId] = useState<string>('')

    const getTasks = () => TasksAPI
        .getTasks(todoListId)
        .then(res => setState(res.data))

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
    const [state, setState] = useState({})
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const changeTaskTitle = () => TasksAPI
        .createTasks(todoListId, title)
        .then(res => setState(res.data))

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
            <button onClick={changeTaskTitle}>Change task title</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState({})
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => TasksAPI
        .deleteTask(todoListId, taskId)
        .then(res => setState(res.data))

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
    const [state, setState] = useState({})
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTask = () => {
        const data: UpdateTaskType = {
            title: title,
            description: '',
            completed: true,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        }

        TasksAPI
            .updateTask(todoListId, taskId, data)
            .then(res => setState(res.data))
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
            <button onClick={updateTask}>update</button>
        </div>
    </div>
}