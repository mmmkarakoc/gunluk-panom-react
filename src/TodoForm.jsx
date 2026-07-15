import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === '') return;

    onAdd(input, dueDate || null);
    setInput('');
    setDueDate('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Yeni görev ekle..."
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default TodoForm;