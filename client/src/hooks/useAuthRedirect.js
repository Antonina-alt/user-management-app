import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_REQUIRED_EVENT, SESSION_EXPIRED_STATE } from '../constants/auth.js';
import { ROUTES } from '../constants/routes.js';
import { saveLoginRedirectState } from '../utils/loginRedirectState.js';

export const useAuthRedirect = (setUser) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handler = (event) => redirectToLogin(setUser, navigate, event.detail);

        window.addEventListener(AUTH_REQUIRED_EVENT, handler);
        return () => window.removeEventListener(AUTH_REQUIRED_EVENT, handler);
    }, [navigate, setUser]);
};

const redirectToLogin = (setUser, navigate, state) => {
    const loginState = { ...SESSION_EXPIRED_STATE, ...(state || {}) };

    saveLoginRedirectState(loginState);
    setUser(null);
    navigate(ROUTES.login, { replace: true, state: loginState });
};
