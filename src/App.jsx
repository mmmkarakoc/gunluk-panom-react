import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Weather from './Weather';
import Auth from './Auth';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Görevler alınamadı', err));
  }, [token]);

  async function addTodo(text) {
    const res = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  }

  async function toggleTodo(id, currentDone) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ done: !currentDone }),
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: currentDone ? 0 : 1 } : todo
      )
    );
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setTodos([]);
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