function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={todo.done ? 'todo-item done' : 'todo-item'}
          onClick={() => onToggle(todo.id, todo.done)}
        >
          <span>{todo.text}</span>
          <button
            className="btn-delete"
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