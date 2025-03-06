import axios from 'axios';

// Функция для получения токена из локального хранилища
export const getAuthToken = () => {
    return window.localStorage.getItem('token');  // Берём токен из localStorage
};

// Создание экземпляра axios (замени на свой, если у тебя другой экземпляр)
const reminderApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000, // Настрой таймаут по необходимости
});

// Установка интерцептора для добавления токена в заголовки всех запросов
reminderApi.interceptors.request.use(
    (config) => {
        const token = getAuthToken(); // Берём токен из localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Регистрация
export const register = async (username, email, password, role) => {
    try {
        const response = await reminderApi.post('/auth/registration', { username, email, password, role });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Вход
export const login = async (username, password) => {
    try {
        const response = await reminderApi.post('/auth/login', { username, password });
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

// Добавление друга
export const addFriend = async (friendId) => {
    try {
        const response = await reminderApi.post(`/friend/add/${friendId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Получение ваших запросов в друзья
export const getYourFriendRequests = async () => {
    try {
        const response = await reminderApi.get('/friend/yours_requests');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Получение запросов в друзья, отправленных вам
export const getFriendRequestsToYou = async () => {
    try {
        const response = await reminderApi.get('/friend/requests_to_you');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Принятие запроса в друзья
export const acceptFriendRequest = async (friendId, response) => {
    try {
        const apiResponse = await reminderApi.post(`/friend/accept/${friendId}`, { response });
        return apiResponse.data;
    } catch (error) {
        throw error;
    }
};

// Создание проекта
export const createProject = async (projectName, userId, tags) => {
    try {
        const projectDto = { projectName, userId, tags };
        const response = await reminderApi.post('/project/create', projectDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProject = async (projectId) => {
    try {
        const response = await reminderApi.get(`/project/getProject/${projectId}`);
        return response.data
    } catch (error) {
        throw error;
    }
}

// Получение задач проекта
export const getProjectTasks = async (projectId) => {
    try {
        const response = await reminderApi.get(`/project/${projectId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Добавление пользователя в проект
export const addUserToProject = async (projectId, userId) => {
    try {
        const response = await reminderApi.post(`/project/${projectId}/add_user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Изменение роли пользователя в проекте
export const editUserRole = async (projectId, userId, projectRole) => {
    try {
        const response = await reminderApi.post(`/project/${projectId}/edit_user_role/${userId}`, { projectRole });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Поиск задач по статусу
export const searchTaskByStatus = async (status) => {
    try {
        const response = await reminderApi.get('/search/findTaskByStatus', { params: { status } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Поиск задач по заголовку
export const searchTaskByTitle = async (title) => {
    try {
        const response = await reminderApi.get('/search/findTaskByTitle', { params: { title } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProjects = async () => {
    try{
        const response = await reminderApi.get('/project');
        return response.data;
    } catch (error) {
        throw error
    }
}

// Получение тегов проекта
export const getProjectTags = async (projectId) => {
    try {
        const response = await reminderApi.get(`/tag/${projectId}/project_tags`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Получение ID тегов проекта
export const getProjectTagsId = async (projectId) => {
    try {
        const response = await reminderApi.get(`/tag/${projectId}/project_tags_id`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Создание задачи
export const createTask = async (taskDto, projectId) => {
    try {
        // Теперь мы передаем projectId в запрос
        const response = await reminderApi.post(`/${projectId}/task/create`, taskDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Обновление задачи
export const updateTask = async (taskId, taskDto) => {
    try {
        const response = await reminderApi.put(`/task/update/${taskId}`, taskDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTaskTags = async (projectId, taskId) => {
    try {
        const response = await reminderApi.get(`${projectId}/task/${taskId}/tags`);
        return response.data;  // Это будет массив объектов тегов
    } catch (error) {
        console.error("Ошибка при получении тегов задачи", error);
        throw error;
    }
};



// Удаление задачи
export const deleteTask = async (taskId) => {
    try {
        const response = await reminderApi.delete(`/task/delete/${taskId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Получение информации о пользователе по имени
export const getUserByUsername = async (username) => {
    try {
        const response = await reminderApi.get(`/user/${username}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default reminderApi;