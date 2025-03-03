import React, { useState } from 'react';
import { createProject, getAuthToken } from '../../Api/ReminderApi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [tags, setTags] = useState([{ tagName: '', color: '#000000' }]); // Значение по умолчанию для цвета (черный)
    const navigate = useNavigate();

    // Функция для получения ID пользователя из токена
    const getUserIdFromToken = () => {
        const token = getAuthToken(); // Получаем токен
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Декодируем токен
                console.log(decodedToken); // Посмотрите структуру токена
                return decodedToken.id; // Извлекаем userId
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
                return null;
            }
        }
        return null;
    };

    // Функция для добавления нового тега
    const handleAddTag = () => {
        setTags([...tags, { tagName: '', color: '#000000' }]); // Добавляем новый тег с цветом по умолчанию
    };

    // Функция для изменения данных тега
    const handleTagChange = (index, e) => {
        const updatedTags = tags.map((tag, i) =>
            i === index ? { ...tag, [e.target.name]: e.target.value } : tag
        );
        setTags(updatedTags);
    };

    // Функция для изменения цвета тега
    const handleColorChange = (index, e) => {
        const updatedTags = tags.map((tag, i) =>
            i === index ? { ...tag, color: e.target.value } : tag
        );
        setTags(updatedTags);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = getUserIdFromToken(); // Получаем ID пользователя из токена

        if (!userId) {
            alert('Пользователь не авторизован');
            return;
        }

        try {
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
                <div>
                    <h3>Теги проекта</h3>
                    {tags.map((tag, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="tagName"
                                placeholder="Название тега"
                                value={tag.tagName}
                                onChange={(e) => handleTagChange(index, e)}
                            />
                            <input
                                type="color"
                                name="color"
                                value={tag.color}
                                onChange={(e) => handleColorChange(index, e)}
                            />
                            <span style={{ backgroundColor: tag.color, padding: '5px', borderRadius: '3px' }} />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTag}>Добавить тег</button>
                </div>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}

export default CreateProject;
