import React, {useEffect, useState} from "react";

import {GetTasksType, TasksAPI} from "../api/tasksAPI";


export default {
    title: 'API/Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<GetTasksType>()

    useEffect(() => {
        TasksAPI
            .getTasks('42451a1b-c17c-40e3-b516-c5b8654151a6')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        TasksAPI
            .createTasks('42451a1b-c17c-40e3-b516-c5b8654151a6', 'Hello')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        TasksAPI
            .deleteTask('42451a1b-c17c-40e3-b516-c5b8654151a6', '1d84ac33-5ca5-464e-930e-0adbd1ae64b2')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        TasksAPI
            .updateTask(
                '42451a1b-c17c-40e3-b516-c5b8654151a6',
                '642784d7-129f-405d-abe9-2aa14ad18497',
                'buy bread'
            )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}