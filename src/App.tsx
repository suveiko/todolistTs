import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";

import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

import {AppRootState} from "./state/store";
import {
    addTodoListAC, changeTodoListAC,
    changeTodoListFilterAC, removeTodoListAC,
} from "./state/todolists-reducer";

import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";

import './App.css';


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListsType[]>(state => state.todoLists)

    const changeFilter = useCallback((toDoId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(toDoId, value))
    },[dispatch])
    const changeTodolistTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodoListAC(id, title))
    },[dispatch])
    const removeToDoList = useCallback((toDoId: string) => {
        dispatch(removeTodoListAC(toDoId))
    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

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
                        newTitle={title}
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

export default App;
