import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getUserProjects} from '../../Api/ReminderApi';
import {Plus} from "lucide-react";

function ProjectList({onLogout}) {
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
            <Link to="/project/create" className="nav-link-text">
                <button className="sidebar-button">
                    <Plus size={15}/>
                </button>
            </Link>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id} className="project-item">
                        <Link to={`/project/${project.id}`} className="nav-link-text">{project.projectName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectList;