import { LOGIN_REDIRECT_STATE_KEY, STORAGE_MAX_AGE_MS } from '../constants/storage.js';
import { readTimedValue, removeStorageValue, saveTimedValue } from './timedStorage.js';

const SILENT_LOGIN_REDIRECT_STATE = {
    silent: true,
};

export const saveLoginRedirectState = (state) => {
    saveTimedValue(LOGIN_REDIRECT_STATE_KEY, state || SILENT_LOGIN_REDIRECT_STATE);
};

export const readLoginRedirectState = () => {
    return readTimedValue(LOGIN_REDIRECT_STATE_KEY, STORAGE_MAX_AGE_MS);
};

export const clearLoginRedirectState = () => {
    removeStorageValue(LOGIN_REDIRECT_STATE_KEY);
};
