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
    if (!newTodo.trim())
      return;
    await service.addTask(newTodo.trim());
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

  const footer = (
    <footer className="app-footer">
      React<span>·</span>ASP.NET Core<span>·</span>MySQL
    </footer>
  );

  if (!isLoggedIn) {
    return (
      <div className="app-shell">
        {showRegister ? (<Register onRegister={() => setShowRegister(false)} onBack={() => setShowRegister(false)} />) :
          (<Login onLogin={() => setIsLoggedIn(true)} onRegister={() => setShowRegister(true)} />)}
        {footer}
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.isComplete).length;
  const openCount = todos.length - completedCount;
  const progress = todos.length ? Math.round(completedCount / todos.length * 100) : 0;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="app-shell">
      <main className="card todo-card">
        <header className="todo-header">
          <span className="eyebrow">{today}</span>
          <h1 className="brand">Todos<em>.</em></h1>
          <div className="todo-meta">
            <span><strong>{openCount}</strong> open · <strong>{completedCount}</strong> completed</span>
            <span>{progress}%</span>
          </div>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        </header>

        <form className="new-todo-form" onSubmit={createTodo}>
          <input className="new-todo" placeholder="What deserves your attention today?" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button type="submit" className="add-btn" aria-label="Add task" disabled={!newTodo.trim()}>
            <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>A clear horizon.</p>
            <span>Add your first task above.</span>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => {
              return (
                <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                  <input className="toggle" type="checkbox" id={`todo-${todo.id}`} defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label htmlFor={`todo-${todo.id}`}>{todo.name}</label>
                  <button className="destroy" aria-label="Delete task" onClick={() => deleteTodo(todo.id)}>
                    <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      {footer}
    </div>
  );
}

export default App;