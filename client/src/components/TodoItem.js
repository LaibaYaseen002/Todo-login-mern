import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span>{todo.text}</span>
      <div className="todo-actions">
        <button onClick={() => onToggle(todo._id)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          style={{ background: "crimson" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
