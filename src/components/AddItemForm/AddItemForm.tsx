import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';


type AddItemFormType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo(({addItem}: AddItemFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState(false)

    const addNewItem = () => {
        title.trim() ? addItem(title.trim()) : setError(true)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(false)

        e.key === 'Enter' && addNewItem();
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
                onClick={addNewItem}
                disabled={title.trim() === ''}
            >
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
});
