import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
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

    function handleAddTodo(e) {
        const newTodo = todoNameRef.current.value;
        if (newTodo.length < 1) return;

        // Clear the input field
        todoNameRef.current.value = null;
        setTodos(prevTodos => {
            return [...prevTodos, {data: newTodo, id: newTodo, isCompleted: false}];
        });
    }

    return (
        <div>
            <TodoList todos={todos}/>
            <input ref={todoNameRef} type="text" />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button>Clear Completed</button>
            <div>0 left to do</div>
        </div>
    )
}
