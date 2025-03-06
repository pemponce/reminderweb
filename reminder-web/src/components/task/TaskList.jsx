import { getTaskTags } from "../../Api/ReminderApi";
import { useState, useEffect } from "react";

function TaskList({ tasks, pid }) {
    const [tags, setTags] = useState({});

    const fetchTags = async (taskId) => {
        try {
            const taskTags = await getTaskTags(pid, taskId);
            setTags((prevTags) => ({
                ...prevTags,
                [taskId]: taskTags,
            }));
        } catch (error) {
            console.error("Ошибка при получении тегов:", error);
        }
    };

    useEffect(() => {
        tasks.forEach((task) => {
            if (!tags[task.id]) {
                fetchTags(task.id);
            }
        });
    }, [tasks, pid]);

    return (
        <div className="task-list-container">
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <h3>{task.title || "Без названия"}</h3>
                        <p>Описание: {task.content || "Нет описания"}</p>
                        <p>Статус: {task.status || "Не указан"}</p>
                        <p>Теги:
                            {tags[task.id] ? tags[task.id].map((tag) => (
                                <span
                                    key={tag.tagId}
                                    style={{
                                        display: 'inline-block',
                                        margin: '2px',
                                        padding: '4px',
                                        backgroundColor: tag.color,
                                        color: '#fff',
                                        borderRadius: '4px'
                                    }}
                                    className="task-tag"
                                >
                                    {tag.tagName}
                                </span>
                            )) : 'Нет тегов'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;