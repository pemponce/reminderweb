import {getTaskTags} from "../../Api/ReminderApi";
import {useState, useEffect} from "react";

function TaskList({tasks, pid}) {
    const [tags, setTags] = useState({});
    const [selectedTask, setSelectedTask] = useState(null); // Состояние для хранения выбранной задачи
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

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

    // Функция для открытия модального окна с информацией о задаче
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    // Функция для обрезки текста до 20 символов
    const truncateText = (text, maxLength = 20) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="task-list-container">
            <ul className="task-list">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="task-item"
                        onClick={() => handleTaskClick(task)} // Делаем элемент списка кликабельным
                        style={{cursor: 'pointer'}} // Меняем курсор на указатель
                    >
                        <h4>{task.title || "Без названия"}</h4>
                        <p>
                            <strong>Описание:</strong>{" "}
                            {truncateText(task.content || "Нет описания")}
                        </p>
                        <p><strong>Дедлайн:</strong> {task.deadline || "Не указан"}</p>
                        <p><strong>Теги:</strong>
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

            {/* Модальное окно для отображения полной информации о задаче */}
            {isModalOpen && selectedTask && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedTask.title || "Без названия"}</h2>
                        <p><strong>Описание:</strong>
                            <div className="task-list-content-text">
                                {selectedTask.content || "Нет описания"}
                            </div>
                        </p>
                        <p><strong>Статус:</strong> {selectedTask.status || "Не указан"}</p>
                        <p><strong>Автор:</strong> {selectedTask.author || "Не указан"}</p>
                        <p><strong>Дедлайн:</strong> {selectedTask.deadline || "Не указан"}</p>
                        <p><strong>Теги:</strong>
                            {tags[selectedTask.id] ? tags[selectedTask.id].map((tag) => (
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
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskList;