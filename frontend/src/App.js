import React, { useEffect, useState } from 'react';
import service from './service.js';
import Login from './Login';
import Register from './Register';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

async function getTodos() {
  try {
    const todos = await service.getTasks();
    setTodos(todos);
  } 
  catch (error) {
    if (error.response?.status !== 401)
      console.error("Failed to load todos:", error);
  }
}

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    if (isLoggedIn)
      getTodos();
  }, [isLoggedIn]);

  useEffect(() => {
  const handleUnauthorized = () => {
    setIsLoggedIn(false);
    setShowRegister(false);
    setTodos([]);
  };
  window.addEventListener("unauthorized", handleUnauthorized);
  return () => {window.removeEventListener("unauthorized", handleUnauthorized);};
}, []);

  if (!isLoggedIn) {
    return showRegister ? (<Register onRegister={() => setShowRegister(false)} onBack={() => setShowRegister(false)} />) :
      (<Login onLogin={() => setIsLoggedIn(true)} onRegister={() => setShowRegister(true)} />);
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;