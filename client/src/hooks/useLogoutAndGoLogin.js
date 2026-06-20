import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { logout } from '../services/authService.js';
import { saveLoginRedirectState } from '../utils/loginRedirectState.js';

export const useLogoutAndGoLogin = (setUser) => {
    const navigate = useNavigate();

    return useCallback((message) => logoutAndGoLogin(message, setUser, navigate), [navigate, setUser]);
};

const logoutAndGoLogin = async (message, setUser, navigate) => {
    await safelyLogout();
    redirectToLogin(message, setUser, navigate);
};

const safelyLogout = async () => {
    try {
        await logout();
    } catch {
        return null;
    }
};

const redirectToLogin = (message, setUser, navigate) => {
    const loginState = getLoginState(message);

    saveLoginRedirectState(loginState);
    setUser(null);
    navigate(ROUTES.login, { replace: true, state: loginState });
};

const getLoginState = (message) => {
    return message ? { message, variant: 'warning' } : null;
};
