import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from "@mui/material";


type CheckboxType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}


export const CheckboxForm = React.memo(({isDone, callBack}: CheckboxType) => {

    const onChangeHandlerCheck = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }, [callBack])

    return (
        <>
            <Checkbox
                onChange={onChangeHandlerCheck}
                checked={isDone}
            />
        </>
    );
})