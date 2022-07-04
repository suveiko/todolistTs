import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";


type CheckboxType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

export const CheckboxForm = React.memo(({isDone, callBack}: CheckboxType) => {
    console.log('CheckBox Form')

    const onChangeHandlerCheck = (event: ChangeEvent<HTMLInputElement>) => callBack(event.currentTarget.checked)

    return (
        <>
            <Checkbox
                onChange={onChangeHandlerCheck}
                checked={isDone}
            />
        </>
    );
})