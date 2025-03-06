import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = ({ onLogout, toggleTheme }) => {
    return (
        <header className="header-container">
            <div className="header-logo">
                <Link to="/projects" className="header-link">Проекты</Link>
            </div>
            <div className="header-auth-links">
                <Link to="/login" className="header-link">Войти</Link>
                <Link to="/register" className="header-link">Зарегистрироваться</Link>
                {onLogout && <button onClick={onLogout} className="header-button">Выйти</button>}
                <button onClick={toggleTheme} className="header-button">Сменить тему</button>
            </div>
        </header>
    );
};

export default Header;