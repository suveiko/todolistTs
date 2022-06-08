import React, {useState} from 'react';

import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import Todolist, {TaskType} from './Todolist';
import AddItemForm from "./components/AddItemForm";

import './App.css';


export type FilterValuesType = "all" | "active" | "completed";
type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todoLists, setToDoLists] = useState<ToDoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [toDoId]: tasks[toDoId].map(
                t => t.id === taskId ?
                    {
                        ...t,
                        isDone
                    }
                    : t)
        })
    }
    const changeFilter = (toDoId: string, value: FilterValuesType) => {
        setToDoLists(todoLists.map(t => t.id === toDoId ? {...t, filter: value} : t))
    }
    const changeTodolistTitle = (title: string, id: string) => {
        setToDoLists(
            todoLists.map
            (t => t.id === id
                ?
                {
                    ...t,
                    title
                }
                : t))
    }
    const removeToDoList = (toDoId: string) => {
        setToDoLists(todoLists.filter(t => t.id !== toDoId))
        delete tasks[toDoId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: ToDoListsType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setToDoLists([newTodoList, ...todoLists])
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

    const itemsTodoLists = todoLists.map(({filter, id, title}) => {

        let tasksForTodolist = tasks[id];
        if (filter === "active") tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        if (filter === "completed") tasksForTodolist = tasksForTodolist.filter(t => t.isDone);

        return (
            <Grid
                item
                key={id}
            >
                <Paper
                    elevation={8}
                    style={{padding: '20px'}}
                    square
                >
                    <Todolist
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
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '15px 0px'}}>
                    <AddItemForm addTask={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {itemsTodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
