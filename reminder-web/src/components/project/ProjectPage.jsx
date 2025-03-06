import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../task/TaskList';
import CreateTask from '../task/CreateTask';
import { getProject, getProjectTasks } from '../../Api/ReminderApi';
import '../../App.css';

function ProjectPage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getProjectTasks(projectId);
                const projectData = await getProject(projectId);
                setTasks(tasksData || []);
                setProject(projectData.projectName);
            } catch (error) {
                console.error('Ошибка загрузки задач:', error);
            }
        };
        fetchTasks();
    }, [projectId]);

    const tasksByStatus = {
        TODO: tasks.filter(task => task.status === 'TODO'),
        IN_PROCESS: tasks.filter(task => task.status === 'IN_PROCESS'),
        DONE: tasks.filter(task => task.status === 'DONE'),
        TIME_IS_OVER: tasks.filter(task => task.status === 'TIME_IS_OVER'),
    };

    const renderTaskColumn = (status, label) => {
        const taskList = tasksByStatus[status];
        return (
            <div className="task-column-container">
                <h3>{label} ({taskList.length})</h3>
                {taskList.length > 0 ? (
                    taskList.map((task) => (
                        <div key={task.id} className="task-card-container">
                            <TaskList tasks={[task]} pid={[projectId]} />
                        </div>
                    ))
                ) : (
                    <p>Нет задач в этой категории</p>
                )}
            </div>
        );
    };

    return (
        <div className="app-container">
            <div className="project-page-container">
                <h1>Проект: {project}</h1>
                <h2>Задачи</h2>

                <div className="tasks-grid">
                    {renderTaskColumn('TODO', 'Запланировано')}
                    {renderTaskColumn('IN_PROCESS', 'В работе')}
                    {renderTaskColumn('DONE', 'Завершено')}
                    {renderTaskColumn('TIME_IS_OVER', 'Время вышло')}
                </div>

                <CreateTask projectId={projectId} />
            </div>
        </div>
    );
}

export default ProjectPage;
