import { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../services/userService.js';
import { getErrorMessage } from '../utils/error.js';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadUsers = useCallback(async () => {
        const { data } = await getUsers();
        setUsers(data);
    }, []);

    useEffect(() => {
        loadInitialUsers(loadUsers, setError, setLoading);
    }, [loadUsers]);

    return { users, loading, error, setError, loadUsers };
};

const loadInitialUsers = async (loadUsers, setError, setLoading) => {
    try {
        await loadUsers();
    } catch (error) {
        setError(getErrorMessage(error, 'Failed to load users.'));
    } finally {
        setLoading(false);
    }
};
