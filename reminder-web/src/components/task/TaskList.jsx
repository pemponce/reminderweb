import React from 'react';

function TaskList({ tasks }) {
    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.content}</p>
                        <p>Статус: {task.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;