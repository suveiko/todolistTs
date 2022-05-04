import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTask: (removeId: number) => void

}
type FilterForColanderType = 'ALL' | 'Active' | 'Completed'

export function Todolist(props: PropsType) {
    const FilterButton = (FilterForColanderType: FilterForColanderType) => {
        setFilterForColander(FilterForColanderType)
    }

    const [filterForColander, setFilterForColander] = useState<FilterForColanderType>('ALL')

    let colander = props.tasks
    if (filterForColander === 'Active') {
        colander = props.tasks.filter(t => !t.isDone)
    }

    if (filterForColander === 'Completed') {
        colander = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {colander.map(t => {
                return (
                    <li key={t.id}>
                        <button onClick={() => props.RemoveTask(t.id)}>X</button>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => FilterButton('ALL')}>All</button>
            <button onClick={() => FilterButton('Active')}>Active</button>
            <button onClick={() => FilterButton('Completed')}>Completed</button>
        </div>
    </div>
}
