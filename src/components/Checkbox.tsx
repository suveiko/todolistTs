import React, {ChangeEvent} from 'react';

type CheckboxType = {
    callBack: (isDone: boolean) => void
    isDone: boolean
}

const Checkbox = ({isDone, callBack}: CheckboxType) => {

    const onChangeHandlerCheck = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }

    return (
        <>
            <input type="checkbox"
                   onChange={onChangeHandlerCheck}
                   checked={isDone}/>
        </>
    );
};

export default Checkbox