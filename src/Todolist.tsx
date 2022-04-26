import React from "react";

type TodolistPropsType = {
    title: string
    name1?: number
    name2?: string
    tasks: Array<inArrayType>
}

type inArrayType = {
    id: number,
    title: string,
    isDone: boolean

}

export const Todolist = (props:TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>{props.name1}</div>
            <div>{props.name2}</div>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) =>{
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
                    )
                })}

                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}