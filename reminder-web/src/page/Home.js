import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../Api/ReminderApi";
import "../index.css";

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails();
                setUser(userDetails);
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="home-container">
            <h1 className="home-title">Добро пожаловать в наше приложение!</h1>

            {user ? (
                <div className="home-content">
                    <h2 className="home-subtitle">Привет, {user.username}!</h2>
                    <p className="home-text">
                        Вы вошли как:<br/> <strong>{user.username}</strong> <br/> <strong>{user.email}</strong>
                    </p>
                </div>
            ) : (
                <div className="home-content">
                    <h2 className="home-subtitle">Вы еще не вошли в систему</h2>
                    <p className="home-text">
                        Чтобы получить доступ ко всем возможностям, выполните вход.
                    </p>
                    <Link to="/login" className="home-link">
                        Войти
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
