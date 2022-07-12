import React from "react";

import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {CheckboxForm} from "../CheckboxForm/CheckboxForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import {TaskType} from "../../Todolist";


type TasksPropsType = {
    changeTaskTitleHandler: (title: string) => void
    changeCheckBox: (isDone: boolean) => void
    removeTask: () => void
} & TaskType


export const Tasks = React.memo((
    {isDone, title, changeTaskTitleHandler, changeCheckBox, removeTask}
        : TasksPropsType) => {

    return (
        <li className={isDone ? "is-done" : ""}>
            <CheckboxForm
                callBack={changeCheckBox}
                isDone={isDone}
            />
            <EditableSpan
                updateTitle={changeTaskTitleHandler}
                title={title}
            />
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})