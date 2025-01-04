import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/ReminderApi"; // Используем функцию login из API

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await login({ username, password });

            console.log("Login response:", response);

            localStorage.setItem("auth_token", response.token); // Сохранение токена

            navigate("/");
            window.location.reload()
        } catch (error) {
            console.error("Login error:", error);
            setError("Неверное имя пользователя или пароль.");
        }
    };


    return (
        <div className="login-container">
            <h1 className="login-title">Вход</h1>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleLogin} className="login-button">
                    Войти
                </button>
            </div>
        </div>
    );
};

export default Login;
