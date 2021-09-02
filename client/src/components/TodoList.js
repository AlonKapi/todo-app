import React from 'react';
import Todo from './Todo';

export default function TodoList({todos}) {

    const notCompletedTodos = todos.filter(todo => !todo.isCompleted);
    const completedTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div>
            <h1>Todos:</h1>
            <ul className="todo-list">
                {notCompletedTodos.map(todo => {
                    return <Todo key={todo.id} todo={todo.data} isCompleted={todo.isCompleted}/>;
                })}
            </ul>
            <h1>Completed:</h1>
            <ul className="todo-list completed">
                {completedTodos.map(todo => {
                    return <Todo key={todo.id} todo={todo.data} isCompleted={todo.isCompleted}/>;
                })}
            </ul>
        </div>
    )
}
