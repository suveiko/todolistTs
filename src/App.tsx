import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ])


    const RemoveTask = (removeId: number) => {
        setTasks(tasks.filter(t => t.id !== removeId))
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                RemoveTask={RemoveTask}
            />
        </div>
    );
}

export default App;
