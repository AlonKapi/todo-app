import React from 'react';

export default function Todo({ todo, isCompleted }) {
    return (
        <li>
            <label>
                <input type="checkbox" checked={isCompleted} />
                {todo}
            </label>
        </li>
    )
}
