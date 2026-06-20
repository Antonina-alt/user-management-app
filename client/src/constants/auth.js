export const AUTH_REQUIRED_STATUSES = [401, 403];

export const PUBLIC_AUTH_URLS = [
    '/auth/login',
    '/auth/register',
];

export const AUTH_REQUIRED_EVENT = 'auth:required';

export const SESSION_EXPIRED_STATE = {
    message: 'Your session has expired. Please log in again.',
    variant: 'warning',
};

export const LOGIN_REQUIRED_STATE = {
    message: 'Please log in to access this page.',
    variant: 'warning',
};

export const AUTH_MESSAGES_TO_SHOW = [
    'Your account is blocked.',
    'Your account was deleted. Please register or log in with another account.',
];
