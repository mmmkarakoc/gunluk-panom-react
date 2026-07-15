function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => onToggle(todo.id, todo.done)}
          style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
        >
          {todo.text}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
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