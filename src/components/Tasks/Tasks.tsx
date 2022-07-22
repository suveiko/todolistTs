import React from "react";

import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {CheckboxForm} from "../CheckboxForm/CheckboxForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import {TaskType} from "../../api/types/apiTypes";


type TasksPropsType = {
    changeTaskTitleHandler: (title: string) => void
    changeCheckBox: (isDone: boolean) => void
    removeTask: () => void
} & TaskType


export const Tasks = React.memo((
    {completed, title, changeTaskTitleHandler, changeCheckBox, removeTask}
        : TasksPropsType) => {

    return (
        <li className={completed ? "is-done" : ""}>
            <CheckboxForm
                callBack={changeCheckBox}
                isDone={completed}
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