import axios from 'axios';
import {
    AUTH_MESSAGES_TO_SHOW,
    AUTH_REQUIRED_EVENT,
    AUTH_REQUIRED_STATUSES,
    PUBLIC_AUTH_URLS,
    SESSION_EXPIRED_STATE,
} from '../constants/auth.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});

api.interceptors.response.use((response) => response, handleResponseError);

function handleResponseError(error) {
    if (shouldRequireLogin(error)) {
        dispatchAuthRequired(error);
    }

    return Promise.reject(error);
}

const shouldRequireLogin = (error) => {
    return hasAuthStatus(error) && !shouldSkipAuthRedirect(error);
};

const hasAuthStatus = (error) => {
    return AUTH_REQUIRED_STATUSES.includes(error.response?.status);
};

const shouldSkipAuthRedirect = (error) => {
    return error.config?.skipAuthRedirect || isPublicRequest(error.config?.url);
};

const isPublicRequest = (url = '') => {
    return PUBLIC_AUTH_URLS.some((publicUrl) => url.includes(publicUrl));
};

const dispatchAuthRequired = (error) => {
    window.dispatchEvent(new CustomEvent(AUTH_REQUIRED_EVENT, {
        detail: getAuthRequiredState(error),
    }));
};

const getAuthRequiredState = (error) => {
    const serverMessage = error.response?.data?.message;

    return shouldShowServerMessage(serverMessage)
        ? { message: serverMessage, variant: 'warning' }
        : SESSION_EXPIRED_STATE;
};

const shouldShowServerMessage = (message) => {
    return AUTH_MESSAGES_TO_SHOW.includes(message);
};

export default api;
