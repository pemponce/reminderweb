import React, { useState, useEffect } from 'react';
import { createTask, getProjectTags } from '../../Api/ReminderApi';

function CreateTask({ projectId, authorName }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('TODO');
    const [tagIds, setTagIds] = useState([]);  // Пустой массив для начального состояния
    const [deadline, setDeadline] = useState('');
    const [author, setAuthor] = useState('');
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        setAuthor(authorName);

        if (!projectId) {
            console.error("projectId не передан или равен undefined");
            return;
        }

        const fetchTags = async () => {
            try {
                const tags = await getProjectTags(projectId);
                setAvailableTags(tags);
                // Инициализируем состояние tagIds, предполагая, что каждый тег будет иметь чекбокс
                setTagIds(new Array(tags.length).fill(false));
            } catch (error) {
                console.error('Ошибка загрузки тегов:', error);
            }
        };

        fetchTags();
    }, [authorName, projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!projectId) {
            alert("Ошибка: projectId не передан или равен undefined");
            return;
        }

        // Фильтрация тегов, чтобы убедиться, что передаются только валидные id
        const filteredTagIds = tagIds
            .map((checked, index) => checked ? availableTags[index].id : null)
            .filter(id => id !== null);  // Получаем только выбранные теги

        if (filteredTagIds.length === 0) {
            alert("Выберите хотя бы один тег.");
            return;
        }

        try {
            const taskDto = { title, content, author, tagIds: filteredTagIds, status, deadline };
            await createTask(taskDto, projectId);
            alert('Задача создана!');
        } catch (error) {
            alert('Ошибка создания задачи: ' + error.message);
        }
    };


    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...tagIds];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setTagIds(updatedCheckedItems);
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

                <div>
                    <h4>Выберите теги:</h4>
                    {availableTags.map((tag, index) => (
                        <div key={tag.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={tagIds[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                {tag.tagName} {tag.tagColor}  {/* Предположим, что каждый тег имеет имя */}
                            </label>
                        </div>
                    ))}
                </div>

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
