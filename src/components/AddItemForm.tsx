import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddItemFormType = {
    addTask: (title: string) => void
}

const AddItemForm = ({addTask}: AddItemFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const addItem = () => {
        title.trim() ? addTask(title.trim()) : setError(true)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        e.key === 'Enter' && addItem();
    }

    return (
        <div>
            <TextField
                size='small'
                variant='outlined'
                label='Type value'
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                helperText={error && 'Title is required'}
                error={error}
            />
            <IconButton
                color='primary'
                onClick={addItem}
                disabled={title.trim() === ''}
            >
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;