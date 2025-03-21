import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const Header = ({onLogout, toggleTheme}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <header className="header-container">
            <div className="header-logo">
                <Link to="/projects" className="header-link">Проекты</Link>
            </div>
            <div className="header-auth-links">
                {isAuthenticated ? "" : <button onClick={onLogout} className="header-button">
                    <Link to="/login"
                          className="header-link">Войти
                    </Link>
                </button>}
                {isAuthenticated ? "" : <button onClick={onLogout} className="header-button">
                    <Link to="/register" className="header-link">Зарегистрироваться</Link>
                </button>}
                {isAuthenticated ? onLogout && <button onClick={onLogout} className="header-button">Выйти</button> : ""}
                <button onClick={toggleTheme} className="header-button">Сменить тему</button>
            </div>
        </header>
    );
};

export default Header;