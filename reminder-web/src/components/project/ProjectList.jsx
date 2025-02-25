import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserProjects } from '../../Api/ReminderApi'; // Создаем метод для получения проектов

function ProjectList({ onLogout }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getUserProjects(); // Получаем проекты пользователя
                setProjects(projects);
            } catch (error) {
                console.error('Ошибка загрузки проектов:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Мои проекты</h1>
            <button onClick={onLogout}>Выйти</button>
            <Link to="/project/create">Создать проект</Link>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <Link to={`/project/${project.id}`}>{project.projectName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;
