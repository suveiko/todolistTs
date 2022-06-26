import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {v1} from 'uuid';

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import Todolist, {TaskType} from './Todolist';
import AddItemForm from "./components/AddItemForm";

import './App.css';
import {
    addTodoListAC,
    changeTodoListAC,
    changeTodoListFilterAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {AppRootState} from "./state/store";


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

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListsType[]>(state => state.todoLists)

    const changeFilter = (toDoId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(toDoId, value))
    }
    const changeTodolistTitle = (title: string, id: string) => {
        dispatch(changeTodoListAC(id, title))
    }
    const removeToDoList = (toDoId: string) => {
        dispatch(removeTodoListAC(toDoId))
    }
    const addTodoList = (title: string) => {
        const id = v1()
        dispatch(addTodoListAC(title, id))
    }

    const itemsTodoLists = todoLists.map(({filter, id, title}) => {

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

                        changeFilter={changeFilter}
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
