import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    updateTitle: (newTitle: string) => void
}

const EditableSpan = ({title, updateTitle}: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onEditorMode = () => setEditMode(true)
    const offEditorMode = () => setEditMode(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        updateTitle(newTitle)
    }

    return (
        editMode
            ? <input
                value={newTitle}
                style={{width: '80px'}}
                autoFocus
                onBlur={offEditorMode}
                onChange={onChangeHandler}
            />
            : <span
                style={{cursor: 'pointer'}}
                onDoubleClick={onEditorMode}
            >{title}
        </span>
    );
};

export default EditableSpan;