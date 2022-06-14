import {v1} from "uuid";
import {TasksStateType} from "../App";
import {RemoveTaskAC, taskReducer} from "./task-reducer";

test('correct task should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const taskId = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }

    const endState = taskReducer(startState,RemoveTaskAC(todolistId1, taskId))

    expect(endState[todolistId1][0].title).toBe('JS')
})