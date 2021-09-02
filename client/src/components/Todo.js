import React from 'react';

export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <li className="todo-item">
            <input className="todo-checkbox" type="checkbox" checked={todo.isCompleted} onChange={handleTodoClick} />
            <p className="todo-text">{todo.data}</p>
        </li>
    )
}
