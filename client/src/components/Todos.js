import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import '../styles/Todos.css';
import axios from 'axios';

export default function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const res = await axios.get('http://localhost:3001/todos');
                console.log(res.data);
                setTodos(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTodos();
    }, []);

    const todoNameRef = useRef();

    function toggleTodo(id) {
        async function updateTodoCompleted() {
            try {
                const todo = todos.find(todo => todo.id === id);

                if (!todo) {
                    return;
                }
                
                const res = await axios.put(`http://localhost:3001/todos/${id}`, {isCompleted: !todo.isCompleted});
                console.log(res.data);
                setTodos(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        updateTodoCompleted();
    }

    function handleAddTodo(e) {
        const newTodo = todoNameRef.current.value;
        if (newTodo.length < 1) return;

        // Clear the input field
        todoNameRef.current.value = null;

        async function addNewTodo() {
            try {
                const res = await axios.post('http://localhost:3001/todos/', {data: newTodo});
                const createdTodo = res.data;
                console.log(res.data);

                setTodos(prevTodos => {
                    return [...prevTodos, {data: createdTodo.data, id: createdTodo.id, isCompleted: createdTodo.isCompleted}];
                });
            } catch (error) {
                console.error(error);
            }
        }
        addNewTodo();
    }

    function handleClearCompleted(e) {
        async function clearCompleted() {
            try {
                const res = await axios.get('http://localhost:3001/todos/clearcompleted');
                console.log(res.data);
                setTodos(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        clearCompleted();
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <div className="todo-input-container">
                <input className="todo-input-field" ref={todoNameRef} type="text" />
                <button className="todo-btn todo-add-btn" onClick={handleAddTodo}>Add Todo</button>
                <button className="todo-btn todo-clear-btn" disabled={todos.every(todo => !todo.isCompleted)} onClick={handleClearCompleted} >Clear Completed</button>
            </div>
        </>
    )
}