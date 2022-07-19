import axios from "axios";


const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "d109b0c8-ad95-4d03-855f-a4cafa3fa08d"
    }
}


export const TodolistAPI = {
    getTodoLists: () => axios
        .get('https://social-network.samuraijs.com/api/1.1/todo-lists', setting),

    createTodoList: (title: string) => axios
        .post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, setting),

    deleteTodoList: (id: string) => axios
        .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, setting),

    updateTodoListTitle: (id: string, title: string) => axios
        .put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, setting)
}