import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {getAuthToken, logout} from "../Api/ReminderApi";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();
        setIsAuthenticated(!!token);
    }, []);


    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        navigate("/login")
        window.location.reload()

    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Главная</Link>
                {isAuthenticated  ? (
                    <>
                        <Link to="/manage" className="navbar-link">Управление</Link>
                        <Link to="/events" className="navbar-link">События</Link>
                        <button onClick={handleLogout} className="navbar-button">Выйти</button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link">Войти</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
