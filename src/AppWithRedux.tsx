import React, {useReducer} from "react";

import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import Todolist, {TaskType} from './Todolist';
import AddItemForm from "./components/AddItemForm";

import './App.css';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ],
    });

    const removeTask = (toDoId: string, id: string) => {
        dispatchTasks(removeTaskAC(toDoId, id))
    }
    const addTask = (toDoId: string, title: string) => {
        dispatchTasks(addTaskAC(toDoId, title))
    }
    const changeStatus = (toDoId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(toDoId, taskId, isDone))
    }
    const changeTaskTitle = (taskId: string, title: string, toDoId: string) => {
        dispatchTasks(changeTaskTitleAC(toDoId, taskId, title))
    }

    const changeFilter = (toDoId: string, value: FilterValuesType) => {
        dispatchTodoLists(changeTodoListFilterAC(toDoId, value))
    }
    const changeTodolistTitle = (title: string, id: string) => {
        dispatchTodoLists(changeTodoListAC(id, title))
    }
    const removeToDoList = (toDoId: string) => {
        dispatchTodoLists(removeTodoListAC(toDoId))
        dispatchTasks(removeTodoListAC(toDoId))
    }
    const addTodoList = (title: string) => {
        const id = v1()
        dispatchTodoLists(addTodoListAC(title, id))
        dispatchTasks(addTodoListAC(title, id))
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
                    style={{padding: '30px'}}
                    square
                >
                    <Todolist
                        title={title}
                        toDoListId={id}
                        filter={filter}
                        tasks={tasksForTodolist}

                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}

                        removeToDoList={removeToDoList}
                        changeTodolistTitle={changeTodolistTitle}
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
    )
}

export default AppWithRedux;
