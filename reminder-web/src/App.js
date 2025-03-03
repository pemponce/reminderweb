import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProjectList from './components/project/ProjectList';
import ProjectPage from './components/project/ProjectPage';
import CreateProject from './components/project/CreateProject';
import Sidebar from './components/Sidebar';
import Header from './components/Header';  // Импортируем Header
import { login } from './Api/ReminderApi';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`app ${theme}`}>
            <Router>
                {/* Хедер всегда виден сверху */}
                <Header onLogout={handleLogout} />

                {/* Сайдбар только если пользователь авторизован */}
                {isAuthenticated && <Sidebar onLogout={handleLogout} toggleTheme={toggleTheme} />}

                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/projects"
                        element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/project/:projectId"
                        element={isAuthenticated ? <ProjectPage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/project/create"
                        element={isAuthenticated ? <CreateProject /> : <Navigate to="/login" />}
                    />
                    <Route path="/" element={<Navigate to="/projects" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
