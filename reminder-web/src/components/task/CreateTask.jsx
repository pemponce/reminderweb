import React, { useState, useEffect } from 'react';
import { createTask, getProjectTags } from '../../Api/ReminderApi';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();

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

        const filteredTagIds = tagIds
            .map((checked, index) => {
                if (checked && availableTags[index]) {
                    const tag = availableTags[index];
                    return tag.id;
                }
                return null;
            })
            .filter(id => id !== null);

        if (filteredTagIds.length === 0) {
            alert("Выберите хотя бы один тег.");
            return;
        }
        if (deadline == null || deadline === '' || deadline === "") {
            alert("Выберите дату дедлайна")
            return;
        }

        try {
            const taskDto = { title, content, author, tagIds: filteredTagIds, status, deadline };
            await createTask(taskDto, projectId);
            window.location.reload();
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
        <div className="task-form-container">
            <h2>Создать задачу</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input"
                />
                <textarea
                    placeholder="Описание"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="task-textarea"
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="task-select">
                    <option value="TODO">TODO</option>
                    <option value="IN_PROCESS">IN_PROCESS</option>
                    <option value="DONE">DONE</option>
                </select>

                <div className="tags-container">
                    <h4>Выберите теги:</h4>
                    {availableTags.length === 0 ? (
                        <div>No tags available for this project.</div>
                    ) : (
                        availableTags.map((tag, index) => (
                            <div key={tag.id} className="tag-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={tagIds[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                        className="tag-checkbox"
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
                    className="task-datetime"
                />
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
}

export default CreateTask;