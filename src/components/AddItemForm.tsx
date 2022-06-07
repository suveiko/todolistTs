import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

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
                variant={"outlined"}
                label={'Type value'}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                error={error}
                helperText={error ? 'Title is required' : ''}
            />
            <Button
                variant={"contained"}
                style={{maxWidth: '50px', maxHeight: '50px', minWidth: '50px', minHeight: '50px'}}
                color={"primary"}
                onClick={addItem}
                disabled={title.trim() === ''}
            >+
            </Button>
        </div>
    );
};

export default AddItemForm;