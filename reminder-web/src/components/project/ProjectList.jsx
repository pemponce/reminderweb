import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProjects } from '../../Api/ReminderApi';

function ProjectList({ onLogout }) {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getUserProjects();
                setProjects(projects);
            } catch (error) {
                console.error('Ошибка загрузки проектов:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="project-container">
            <h1 className="page-title">Мои проекты</h1>
            <button onClick={onLogout} className="button logout">Выйти</button>
            <button onClick={() => navigate('/project/create')} className="button create">Создать проект</button>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id} className="project-item">
                        <Link to={`/project/${project.id}`} className="project-link">{project.projectName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;