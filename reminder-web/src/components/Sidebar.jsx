import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ onLogout, toggleTheme }) {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/projects">Проекты</Link>
                    </li>
                    <li>
                        <Link to="/project/create">Создать проект</Link>
                    </li>
                </ul>
            </nav>
            <button onClick={toggleTheme}>Сменить тему</button>
            <button onClick={onLogout}>Выйти</button>
        </div>
    );
}

export default Sidebar;
