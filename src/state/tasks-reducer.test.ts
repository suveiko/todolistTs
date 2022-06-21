import {v1} from "uuid";

import {TasksStateType} from "../App";

import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC, tasksReducer
} from "./tasks-reducer";
import {addTodoListAC} from "./todolists-reducer";


test('correct task should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const taskId = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: taskId, title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, taskId))

    expect(endState[todolistId1][0].title).toBe('JS')
    expect(endState[todolistId1].length).toBe(4)
})
test('correct task should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTaskTitle = 'Angular'

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(todolistId1, newTaskTitle))

    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId2].length).toBe(5)
})
test('task status should be changed', () => {
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

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId2, taskId, newTaskStatus))

    expect(endState[todolistId2][1].isDone).toBe(newTaskStatus)
    expect(endState[todolistId2][1].title).toBe('JS2')
})
test('task title should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTaskTitle = 'Swift'
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
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: taskId, title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId2, taskId, newTaskTitle))

    expect(endState[todolistId2][3].title).toBe(newTaskTitle)
    expect(endState[todolistId2].length).toBe(5)
    expect(endState[todolistId1][3].title).toBe('Rest API')
})
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodoListAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
