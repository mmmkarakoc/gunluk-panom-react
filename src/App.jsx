import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Weather from './Weather';
import Auth from './Auth';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    setTodos([...todos, { text, done: false }]);
  }

  function toggleTodo(index) {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  if (!token) {
    return <Auth onLogin={(t) => setToken(t)} />;
  }

  return (
    <div>
      <h1>Günlük Panom (React)</h1>
      <button onClick={handleLogout}>Çıkış Yap</button>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <Weather />
    </div>
  );
}

export default App;