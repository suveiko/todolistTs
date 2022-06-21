import {v1} from 'uuid'

import {
    addTodoListAC, changeTodoListAC, changeTodoListFilterAC,
    removeTodolistAC, todoListsReducer
} from './todolists-reducer'
import {FilterValuesType, TasksStateType, TodoListsType} from '../App'
import { tasksReducer} from "./tasks-reducer";


test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: TodoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'
    const startState: TodoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, changeTodoListAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = 'completed'
    const startState: TodoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: TodoListsType[] = []

    const action = addTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})
