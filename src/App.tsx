import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [toDoLists, setToDoLists] = useState<ToDoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (toDoId: string, id: string) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].filter(t => t.id !== id)})
    }
    const addTask = (toDoId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [toDoId]: [newTask, ...tasks[toDoId]]})
    }
    const changeStatus = (toDoId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeFilter = (toDoId: string, value: FilterValuesType) => {
        setToDoLists(toDoLists.map(t => t.id === toDoId ? {...t, filter: value} : t))
    }
    const changeTodolistTitle = (title: string, id: string) => {
        setToDoLists(
            toDoLists.map
            (t => t.id === id
                ?
                {
                    ...t,
                    title
                }
                : t))
    }
    const removeToDoList = (toDoId: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== toDoId))
        delete tasks[toDoId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: ToDoListsType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setToDoLists([newTodoList, ...toDoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const changeTaskTitle = (taskId: string, title: string, toDoId: string) => {
        setTasks({
            ...tasks,
            [toDoId]: tasks[toDoId].map(
                t => t.id === taskId ?
                    {
                        ...t,
                        title
                    }
                    : t)
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {toDoLists.map(({filter, id, title}) => {

                let tasksForTodolist = tasks[id];
                if (filter === "active") tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                if (filter === "completed") tasksForTodolist = tasksForTodolist.filter(t => t.isDone);

                return (
                    <Todolist
                        key={id}
                        toDoListId={id}
                        title={title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={filter}
                        removeToDoList={removeToDoList}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
