import api from './api';

const patchUserIds = (url, ids) => api.patch(url, { ids });

export const getUsers = () => api.get('/users');

export const blockUsers = (ids) => patchUserIds('/users/block', ids);

export const unblockUsers = (ids) => patchUserIds('/users/unblock', ids);

export const deleteUsers = (ids) => api.delete('/users', { data: { ids } });

export const deleteUnverifiedUsers = () => api.delete('/users/unverified');
