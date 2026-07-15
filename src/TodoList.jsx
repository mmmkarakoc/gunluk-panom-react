function isOverdue(dueDate, done) {
  if (!dueDate || done) return false;
  const today = new Date().toISOString().split('T')[0];
  return dueDate < today;
}

function formatDate(dueDate) {
  if (!dueDate) return null;
  const [year, month, day] = dueDate.split('-');
  return `${day}.${month}.${year}`;
}

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={todo.done ? 'todo-item done' : 'todo-item'}
          onClick={() => onToggle(todo.id, todo.done)}
        >
          <span>
            {todo.text}
            {todo.due_date && (
              <span className={isOverdue(todo.due_date, todo.done) ? 'due-date overdue' : 'due-date'}>
                {' '}({formatDate(todo.due_date)})
              </span>
            )}
          </span>
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