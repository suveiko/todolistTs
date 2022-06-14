import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, taskReducer} from "./task-reducer";

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

    const endState = taskReducer(startState, RemoveTaskAC(todolistId1, taskId))

    expect(endState[todolistId1][0].title).toBe('JS')
    expect(endState[todolistId1].length).toBe(4)
})
test('correct task should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTaskTitle = 'Angular'

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
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

    const endState = taskReducer(startState, AddTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1][0].title).toBe('Angular')
    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId2].length).toBe(5)
})
test('task status should be corrected', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTaskStatus = false
    const taskId = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: taskId, title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }

    const endState = taskReducer(startState, ChangeTaskStatusAC(todolistId2, taskId, newTaskStatus))

    expect(endState[todolistId2][1].isDone).toBe(false)
    expect(endState[todolistId2][1].title).toBe('JS2')
})