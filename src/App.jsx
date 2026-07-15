import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Weather from './Weather';
import Auth from './Auth';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [todos, setTodos] = useState([]);

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setTodos([]);
  }

  function handleUnauthorized(res) {
    if (res.status === 401 || res.status === 403) {
      handleLogout();
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (handleUnauthorized(res)) return null;
        return res.json();
      })
      .then((data) => {
        if (data) setTodos(data);
      })
      .catch((err) => console.error('Görevler alınamadı', err));
  }, [token]);

  async function addTodo(text, dueDate) {
    const res = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, due_date: dueDate }),
    });

    if (handleUnauthorized(res)) return;

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  }

  async function toggleTodo(id, currentDone) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ done: !currentDone }),
    });

    if (handleUnauthorized(res)) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: currentDone ? 0 : 1 } : todo
      )
    );
  }

  async function deleteTodo(id) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (handleUnauthorized(res)) return;

    setTodos(todos.filter((todo) => todo.id !== id));
  }

  if (!token) {
    return <Auth onLogin={(t) => setToken(t)} />;
  }

  return (
    <div className="page">
      <div className="topbar">
        <h1>Günlük Panom</h1>
        <button className="btn-ghost" onClick={handleLogout}>Çıkış Yap</button>
      </div>

      <section className="card">
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </section>

      <section className="card">
        <Weather />
      </section>
    </div>
  );
}

export default App;