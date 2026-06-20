import api from './api';

export const getCurrentUser = () => {
    return api.get('/auth/manager_table', { skipAuthRedirect: true });
};

export const login = (data) => api.post('/auth/login', data);

export const register = (data) => api.post('/auth/register', data);

export const logout = () => api.post('/auth/logout', null, { skipAuthRedirect: true });
