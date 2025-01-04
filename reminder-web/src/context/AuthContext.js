import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Проверяем наличие токена в localStorage при загрузке страницы
        const token = localStorage.getItem("auth_token");

        if (token) {
            setUser({ token });  // Пример, что вы сохраняете только токен, можно добавить другие данные пользователя
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
