import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, toggleTodo }) {

    const notCompletedTodos = todos.filter(todo => !todo.isCompleted);
    const completedTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div className="todo-lists-container">
            <div className="todo-list-container">
                <h1 className="todo-header-text">Todos:</h1>
                <ul className="todo-list">
                    {notCompletedTodos.map(todo => {
                        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
                    })}
                </ul>
                <p className="todos-left-text"><i>{notCompletedTodos.length} left to do</i></p>
            </div>
            <div className="todo-list-container">
                <h1 className="todo-header-text">Completed:</h1>
                <ul className="todo-list completed">
                    {completedTodos.map(todo => {
                        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
                    })}
                </ul>
            </div>
        </div>
    )
}
