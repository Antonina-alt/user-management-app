import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearLoginRedirectState } from '../utils/loginRedirectState.js';

export const useRouteStatusToast = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    useEffect(() => {
        showRouteToast(location, navigate, setToast);
    }, [location, navigate]);

    return { toast, setToast };
};

const showRouteToast = (location, navigate, setToast) => {
    clearLoginRedirectState();

    if (!location.state?.message) {
        return;
    }

    setToast({
        text: location.state.message,
        variant: location.state.variant || 'warning',
    });

    navigate(location.pathname, { replace: true, state: null });
};