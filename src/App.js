import React, { useState, useRef } from 'react';
import './App.css';

function TaskItem({ task, completed, completeTask, deleteTask }) {
  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      <span className="task-text">{task}</span>
      <div className="task-buttons">
        <button onClick={completeTask}>Completed</button>
        <button onClick={deleteTask}>X</button>
      </div>
      <p className="task-status">{completed ? 'Task Completed' : 'Task Not Completed'}</p>
    </div>
  );
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const inputTask = useRef(null);

  const addTask = () => {
    setTodoList([...todoList, { task: currentTask, completed: false }]);
    inputTask.current.value = '';
    setCurrentTask('');
  };

  const deleteTask = (taskToDelete) => {
    setTodoList(todoList.filter((task) => task.task !== taskToDelete));
  };

  const completeTask = (taskToComplete) => {
    setTodoList(
      todoList.map((task) => ({
        task: task.task,
        completed: task.task === taskToComplete ? true : task.completed,
      }))
    );
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="input-section">
        <input
          ref={inputTask}
          type="text"
          placeholder="Task..."
          onKeyDown={(event) => {
            if (event.keyCode === 13) addTask();
          }}
          onChange={(event) => {
            setCurrentTask(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <hr />
      <ul className="task-list">
        {todoList.map((task, key) => (
          <TaskItem
            key={key}
            task={task.task}
            completed={task.completed}
            completeTask={() => completeTask(task.task)}
            deleteTask={() => deleteTask(task.task)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
