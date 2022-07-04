import React, {useCallback} from "react";
import {useDispatch} from "react-redux";

import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

import {CheckboxForm} from "./CheckboxForm";
import {EditableSpan} from "./EditableSpan";

import {TaskType} from "../Todolist";


type TasksPropsType = {
    todoListId: string
} & TaskType


export const Tasks = React.memo(({id, isDone, title, todoListId}: TasksPropsType) => {

    const dispatch = useDispatch()

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, title))
    }, [todoListId, id])
    const changeCheckBox = useCallback((isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, id, isDone))
    }, [todoListId, id])

    return (
        <li key={id} className={isDone ? "is-done" : ""}>
            <CheckboxForm
                callBack={changeCheckBox}
                isDone={isDone}
            />
            <EditableSpan
                updateTitle={changeTaskTitleHandler}
                title={title}
            />
            <IconButton onClick={() => dispatch(removeTaskAC(todoListId, id))}>
                <Delete/>
            </IconButton>
        </li>
    )
})