import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../task/TaskList';
import CreateTask from '../task/CreateTask';
import {getProject, getProjectTasks} from '../../Api/ReminderApi';

function ProjectPage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getProjectTasks(projectId);
                const projectData = await getProject(projectId);
                setTasks(tasksData); // Сохраняем задачи в стейт
                setProject(projectData.projectName); // Сохраняем задачи в стейт
            } catch (error) {
                console.error('Ошибка загрузки задач:', error);
            }
        };
        fetchTasks();
    }, [projectId]);

    return (
        <div>
            <h1>Проект {project}</h1>
            <TaskList tasks={tasks} />
            <CreateTask projectId={projectId} />
        </div>
    );
}

export default ProjectPage;
