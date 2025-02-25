import React, { useState, useEffect } from 'react';
import { createTask, getProjectTags } from '../../Api/ReminderApi';

function CreateTask({ projectId, authorName }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('TODO');
    const [tagIds, setTagIds] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [author, setAuthor] = useState('');
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        // Устанавливаем имя автора, которое получаем из пропсов
        setAuthor(authorName);

        // Проверяем, что projectId не равен undefined
        if (!projectId) {
            console.error("projectId не передан или равен undefined");
            return;
        }

        // Загружаем доступные теги для проекта
        const fetchTags = async () => {
            try {
                const tags = await getProjectTags(projectId);
                setAvailableTags(tags);
            } catch (error) {
                console.error('Ошибка загрузки тегов:', error);
            }
        };

        fetchTags();
    }, [authorName, projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что projectId не равен undefined
        if (!projectId) {
            alert("Ошибка: projectId не передан или равен undefined");
            return;
        }

        // Фильтруем tagIds, чтобы удалить null
        const filteredTagIds = tagIds.filter(id => id != null);

        try {
            // Передаем projectId при создании задачи
            const taskDto = { title, content, author, tagIds: filteredTagIds, status, deadline };
            await createTask(taskDto, projectId);  // Передаем taskDto и projectId в API
            alert('Задача создана!');
        } catch (error) {
            alert('Ошибка создания задачи: ' + error.message);
        }
    };

    const handleTagChange = (tagId) => {
        // Добавляем или удаляем тег из списка выбранных
        if (tagIds.includes(tagId)) {
            setTagIds(tagIds.filter(id => id !== tagId));
        } else {
            setTagIds([...tagIds, tagId]);
        }
    };

    return (
        <div>
            <h2>Создать задачу</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>

                {/* Выбор тегов */}
                <div>
                    <h4>Выберите теги:</h4>
                    {availableTags.map(tag => (
                        <div key={tag.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={tag.id}
                                    checked={tagIds.includes(tag.id)}
                                    onChange={() => handleTagChange(tag.id)}
                                />
                                {tag.tagName} ({tag.tagColor})
                            </label>
                        </div>
                    ))}
                </div>

                {/* Дедлайн */}
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}

export default CreateTask;