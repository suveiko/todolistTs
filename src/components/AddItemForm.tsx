import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem} disabled={title.trim() === ''}>+</button>
            {error && <div style={{color: 'red'}}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;