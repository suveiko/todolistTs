import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    updateTitle: (newTitle: string) => void
}

const EditableSpan = (p: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(p.title)

    const onEditorMode = () => setEditMode(true)
    const offEditorMode = () => setEditMode(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        p.updateTitle(title)
    }

    return (
        editMode
            ? <input
                value={title}
                style={{width: '80px'}}
                autoFocus onBlur={offEditorMode}
                onChange={onChangeHandler}
            />
            : <span
                style={{cursor: 'pointer'}}
                onDoubleClick={onEditorMode}
            >{p.title}</span>
    );
};

export default EditableSpan;