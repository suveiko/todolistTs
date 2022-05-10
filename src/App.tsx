import React, {useState} from 'react';
import './App.css';
import {InArrayType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'All' | "Completed" | "Active"

function App() {
    let [tasks, setTasks] = useState<InArrayType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "CraphQL", isDone: false}
    ])

    const addTask = (newTitle: string) => {
        let newTasks = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTasks, ...tasks])
    }
    let [filter, setFilter] = useState<FilterType>('All')
    const deleteTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }


    let tasksForToDoList = tasks
    if (filter === "Completed") {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    if (filter === "Active") {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist name={'What to learn'}
                      tasks={tasksForToDoList}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
