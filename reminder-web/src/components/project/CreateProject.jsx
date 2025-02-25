import React, { useState } from 'react';
import { createProject } from '../../Api/ReminderApi';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [tags, setTags] = useState([]); // Состояние для тегов
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = 1; // Здесь нужно получить ID текущего пользователя
            const response = await createProject(projectName, userId, tags);
            alert('Проект создан!');
            navigate('/projects');
        } catch (error) {
            alert('Ошибка создания проекта: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Создать проект</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название проекта"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                {/* Добавление тега */}
                <input
                    type="text"
                    placeholder="Теги проекта"
                    onChange={(e) => setTags(e.target.value.split(','))}
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}

export default CreateProject;
