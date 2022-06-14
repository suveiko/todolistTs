import {v1} from 'uuid'

import {
    AddTodoListAC, ChangeTodoListAC, ChangeTodoListFilterAC,
    RemoveTodolistAC, todoListsReducer
} from './todolists-reducer'
import {FilterValuesType, ToDoListsType} from '../App'


test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: ToDoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: ToDoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'
    const startState: ToDoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = 'completed'
    const startState: ToDoListsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})