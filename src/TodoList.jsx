function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li
          key={index}
          onClick={() => onToggle(index)}
          style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
        >
          {todo.text}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
          >
            Sil
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;