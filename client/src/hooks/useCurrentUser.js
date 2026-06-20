import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService.js';

export const useCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCurrentUser(setUser, setLoading);
    }, []);

    return { user, setUser, loading };
};

const loadCurrentUser = async (setUser, setLoading) => {
    try {
        const { data } = await getCurrentUser();
        setUser(data);
    } catch {
        setUser(null);
    } finally {
        setLoading(false);
    }
};
