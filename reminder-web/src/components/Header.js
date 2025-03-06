import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = ({ onLogout, toggleTheme }) => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/projects">Проекты</Link>
            </div>
            <div className="auth-links">
                <Link to="/login">Войти</Link>
                <Link to="/register">Зарегистрироваться</Link>
                {onLogout && <button onClick={onLogout}>Выйти</button>}
                <button onClick={toggleTheme}>Сменить тему</button>

            </div>
        </header>
    );
};

export default Header;
