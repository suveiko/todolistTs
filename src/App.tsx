import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type FilterType = 'All' | 'Active' | 'Completed'
type TodoListsType = {
    id: string
    title: string
    filterTo: FilterType
}

function App() {

    const todoIdFirst = v1()
    const todoIdSecond = v1()

    const [todoLists, setTodoList] = useState<TodoListsType[]>([
        {id: todoIdFirst, title: 'What to learn', filterTo: 'All'},
        {id: todoIdSecond, title: 'What to buy', filterTo: 'All'},
    ])
    const [tasks, setTasks] = useState({
        [todoIdFirst]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Docker", isDone: false}
        ],
        [todoIdSecond]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Tomato", isDone: false},
            {id: v1(), title: "Onion", isDone: false},
            {id: v1(), title: "Cheese", isDone: false}
        ]
    })

    const addTask = (newTitle: string, todoListId: string) => {
        let task = {id: v1(), title: newTitle, isDone: false}
        let tasksAdd = tasks[todoListId]
        let newTask = [task, ...tasksAdd]
        tasks[todoListId] = newTask
        setTasks({...tasks})
    }
    const deleteTask = (id: string, todoListId: string) => {
        let task = tasks[todoListId]
        let filteredTasks = task.filter(t => t.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterType, todoListId: string) => {
        let todoList = todoLists.find(t => t.id === todoListId)
        if (todoList) {
            todoList.filterTo = value
            setTodoList([...todoLists])
        }
    }
    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let task = tasks[todoListId]
        let newTask = task.find(t => t.id === taskId)
        if (newTask) {
             newTask.isDone = isDone
             setTasks({...tasks})
         }
    }
    const removeTodoList = (todoListId: string) => {
        const newTodoList = todoLists.filter(t => t.id !== todoListId )
        setTodoList(newTodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(({id, title, filterTo}) => {

                let tasksForToDoList = tasks[id]
                if (filterTo === "Completed") tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                if (filterTo === "Active") tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)

                return (
                    <Todolist
                        removeTodo={removeTodoList}
                        key={id}
                        tId={id}
                        name={title}
                        tasks={tasksForToDoList}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={filterTo}
                    />
                )
            })}
        </div>
    );
}

export default App;
