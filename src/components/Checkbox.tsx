import React, {ChangeEvent} from 'react';

type CheckboxType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

export const Checkbox = (props: CheckboxType) => {
    const onChangeHandlerCheck = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <>
            <input type="checkbox"
                   onChange={onChangeHandlerCheck}
                   checked={props.isDone}/>
        </>
    );
};
