import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../task/TaskList';
import CreateTask from '../task/CreateTask';
import { getProject, getProjectTasks } from '../../Api/ReminderApi';
import '../../App.css'; // Импортируем стили

function ProjectPage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]); // tasks всегда массив
    const [project, setProject] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getProjectTasks(projectId);
                const projectData = await getProject(projectId);
                setTasks(tasksData || []); // Если tasksData пустое или null, то присваиваем пустой массив
                setProject(projectData.projectName); // Сохраняем название проекта
            } catch (error) {
                console.error('Ошибка загрузки задач:', error);
            }
        };
        fetchTasks();
    }, [projectId]);

    // Разделяем задачи по статусам. Теперь tasks всегда массив.
    const tasksByStatus = {
        'TODO': (tasks || []).filter(task => task.status === 'TODO'),
        'IN_PROCESS': (tasks || []).filter(task => task.status === 'IN_PROCESS'),
        'DONE': (tasks || []).filter(task => task.status === 'DONE'),
        'TIME_IS_OVER': (tasks || []).filter(task => task.status === 'TIME_IS_OVER'),
    };

    return (
        <div className="project-page">
            <h1>Проект {project}</h1>
            <h2>Задачи</h2>


            {/* Отображаем задачи по колонкам статусов */}
            <div className="tasks-container">
                {/* Колонка для задач со статусом TODO */}
                <div className="task-column">
                    <h3>Запланировано ({tasksByStatus['TODO'].length})</h3>
                    {tasksByStatus['TODO'].length > 0 ? (
                        tasksByStatus['TODO'].map((task) => (
                            <div key={task.id} className="task-card">
                                <TaskList tasks={[task]} pid={[projectId]}/> {/* Передаем массив с одной задачей */}
                            </div>
                        ))
                    ) : (
                        <p>Нет задач в этой категории</p>
                    )}
                </div>

                {/* Колонка для задач со статусом IN_PROCESS */}
                <div className="task-column">
                    <h3>В работе ({tasksByStatus['IN_PROCESS'].length})</h3>
                    {tasksByStatus['IN_PROCESS'].length > 0 ? (
                        tasksByStatus['IN_PROCESS'].map((task) => (
                            <div key={task.id} className="task-card">
                                <TaskList tasks={[task]} pid={[projectId]}/> {/* Передаем массив с одной задачей */}
                            </div>
                        ))
                    ) : (
                        <p>Нет задач в этой категории</p>
                    )}
                </div>

                {/* Колонка для задач со статусом DONE */}
                <div className="task-column">
                    <h3>Завершено ({tasksByStatus['DONE'].length})</h3>
                    {tasksByStatus['DONE'].length > 0 ? (
                        tasksByStatus['DONE'].map((task) => (
                            <div key={task.id} className="task-card">
                                <TaskList tasks={[task]} pid={[projectId]}/> {/* Передаем массив с одной задачей */}
                            </div>
                        ))
                    ) : (
                        <p>Нет задач в этой категории</p>
                    )}
                </div>

                {/* Колонка для задач со статусом TIME_IS_OVER */}
                <div className="task-column">
                    <h3>Время вышло ({tasksByStatus['TIME_IS_OVER'].length})</h3>
                    {tasksByStatus['TIME_IS_OVER'].length > 0 ? (
                        tasksByStatus['TIME_IS_OVER'].map((task) => (
                            <div key={task.id} className="task-card">
                                <TaskList tasks={[task]} pid={[projectId]}/>
                            </div>
                        ))
                    ) : (
                        <p>Нет задач в этой категории</p>
                    )}
                </div>
            </div>

            {/* Форма для создания задачи */}
            <CreateTask projectId={projectId}/>
        </div>
    );
}

export default ProjectPage;