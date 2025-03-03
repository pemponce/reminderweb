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
    let [tags, setTags] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setAuthor(authorName);
        if (!projectId) {
            console.error("projectId не передан или равен undefined");
            return;
        }

        const fetchTags = async () => {
            try {
                setTags = await getProjectTags(projectId);
                setAvailableTags(setTags);
                setTagIds(new Array(setTags.length).fill(false));
            } catch (error) {
                console.error('Ошибка загрузки тегов:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTags();
    }, [authorName, projectId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!projectId) {
            alert("Ошибка: projectId не передан или равен undefined");
            return;
        }

        // Фильтрация тегов
        const filteredTagIds = tagIds
            .map((checked, index) => {
                // Если чекбокс выбран, возвращаем id тега
                if (checked && availableTags[index]) {
                    const tag = availableTags[index];
                    console.log(`Тег выбран: ${tag.tagName}`);
                    console.log(`Тег выбран: ${tag.tagName}, ID: ${tag.id}`);
                    return tag.id; // Возвращаем id выбранного тега
                }
                return null; // Возвращаем null, если тег не выбран
            })
            .filter(id => id !== null);  // Исключаем null из списка

        console.log("tagIds:", tagIds);  // Для диагностики
        console.log("filteredTagIds:", filteredTagIds);  // Для диагностики

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
                    <option value="IN_PROCESS">IN_PROCESS</option>
                    <option value="DONE">DONE</option>
                </select>

                <div>
                    <h4>Выберите теги:</h4>
                    {availableTags.length === 0 ? (
                        <div>No tags available for this project.</div>
                    ) : (
                        availableTags.map((tag, index) => (
                            <div key={tag.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={tagIds[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    {tag.tagName}
                                </label>
                            </div>
                        ))
                    )}

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
