import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type CheckboxType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

const CheckboxForm = ({isDone, callBack}: CheckboxType) => {

    const onChangeHandlerCheck = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }

    return (
        <>
            <Checkbox
                onChange={onChangeHandlerCheck}
                checked={isDone}
            />
        </>
    );
};

export default CheckboxForm