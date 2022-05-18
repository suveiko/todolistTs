import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {InArrayType, Todolist} from "./Todolist";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    let [tasks, setTasks] = useState<InArrayType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "CraphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterType>('All')

    const addTask = (newTitle: string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
    }
    const deleteTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) task.isDone = isDone
        setTasks([...tasks])
    }

    let tasksForToDoList = tasks
    if (filter === "Completed") tasksForToDoList = tasks.filter(t => t.isDone)
    if (filter === "Active") tasksForToDoList = tasks.filter(t => !t.isDone)

    return (
        <div className="App">
            <Todolist name={'What to learn'}
                      tasks={tasksForToDoList}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
