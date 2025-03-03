import React, {useEffect, useState} from "react";
import { Home, Calendar, List, BarChart, Settings, Plus, Folder } from "lucide-react";
import {getUserProjects} from "../Api/ReminderApi";


import { Link } from "react-router-dom"; // Импортируем компонент Link

export default function TaskBoard() {
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

    const [selectedProject, setSelectedProject] = useState();

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Tasking</h2>
                    <nav className="space-y-2">
                        <SidebarItem icon={<Home size={20} />} text="Доска" />
                        <SidebarItem icon={<Calendar size={20} />} text="Календарь" />
                        <SidebarItem icon={<List size={20} />} text="Список задач" />
                        <SidebarItem icon={<BarChart size={20} />} text="Статистика" />
                        <SidebarItem icon={<Settings size={20} />} text="Настройки" />
                        <SidebarItem icon={<Plus size={20} />} text="Новая задача" />
                    </nav>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Другие проекты</h3>
                    <nav className="space-y-2">
                        {projects.map((project) => (
                            <SidebarItem
                                key={project.id}
                                icon={<Folder size={20} />}
                                text={
                                    <Link to={`/project/${project.id}`} className="text-white hover:text-gray-400">
                                        {project.projectName}
                                    </Link>
                                }
                                onClick={() => setSelectedProject(project.id)}
                                isActive={selectedProject === project.id}
                            />
                        ))}
                    </nav>
                    <Link to="/project/create">Создать проект</Link>

                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon, text, onClick, isActive }) {
    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
            }`}
            onClick={onClick}
        >
            {icon}
            <span className="ml-3">{text}</span>
        </div>
    );
}
