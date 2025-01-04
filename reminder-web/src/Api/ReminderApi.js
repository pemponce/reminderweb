import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Создание экземпляра axios с базовыми настройками
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

// Установка токена в заголовки запросов
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Регистрация
export const register = async (registerData) => {
    try {
        const response = await apiClient.post('/auth/register', registerData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Вход
export const login = async (loginData) => {
    try {
        const response = await apiClient.post('/auth/login', loginData);
        const { token } = response.data;

        if (token) {
            localStorage.setItem('auth_token', token);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Выход
export const logout = () => {
    localStorage.removeItem('auth_token');
};

// Поиск пользователей
export const getUserSearch = async (query) => {
    try {
        const response = await apiClient.get('/user/search', {
            params: { text: query }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Добавление друга
export const addFriend = async (friendUrlId) => {
    try {
        const response = await apiClient.post('/user/add_friend', null, {
            params: { friendUrlId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Удаление друга
export const removeFriend = async (friendUrlId) => {
    try {
        const response = await apiClient.post('/user/remove_friend', null, {
            params: { friendUrlId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Список друзей
export const friendsList = async (userId) => {
    try {
        const response = await apiClient.get('/user/friends', {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchChatList = async () => {
    try {
        const response = await apiClient.get(`/chat`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat list:', error);
        throw error;
    }
};

export const fetchChat = async (chatId) => {
    try {
        const response = await axios.get(`${API_URL}/chat/${chatId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
        throw error;
    }
};

// Получение информации о пользователе
export const getUserDetails = async () => {
    try {
        const response = await apiClient.get('/account/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Получение сообщений чата
export const fetchMessages = async (chatId) => {
    try {
        const response = await apiClient.get(`/chat/${chatId}/messages`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Отправка сообщения
export const sendMessage = async (chatId, content) => {
    try {
        const response = await apiClient.post('/chat/send-message', { chatId, content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Создание чата
export const createChat = async (friendId) => {
    try {
        const response = await apiClient.post('/chat/create', null, {
            params: { friendId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Получение чатов пользователя
export const fetchUserChats = async () => {
    try {
        const response = await apiClient.get('/chat/user-chats');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiClient;