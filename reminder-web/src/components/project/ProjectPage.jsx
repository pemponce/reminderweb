import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../task/TaskList';
import CreateTask from '../task/CreateTask';
import { getProjectTasks } from '../../Api/ReminderApi';

function ProjectPage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getProjectTasks(projectId);
                setTasks(tasksData); // Сохраняем задачи в стейт
            } catch (error) {
                console.error('Ошибка загрузки задач:', error);
            }
        };
        fetchTasks();
    }, [projectId]);

    return (
        <div>
            <h1>Проект {projectId}</h1>
            <TaskList tasks={tasks} />
            <CreateTask projectId={projectId} />
        </div>
    );
}

export default ProjectPage;
