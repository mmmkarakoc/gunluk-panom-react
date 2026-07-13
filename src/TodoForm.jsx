import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === '') return;

    onAdd(input);
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Yeni görev ekle..."
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default TodoForm;