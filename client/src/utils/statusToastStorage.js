import { STORAGE_MAX_AGE_MS } from '../constants/storage.js';
import { DEFAULT_TOAST_VARIANT, STATUS_TOAST_STORAGE_KEY } from '../constants/toast.js';
import { readTimedValue, removeStorageValue, saveTimedValue } from './timedStorage.js';

export const saveStatusToast = (toast) => {
    const text = toast?.text || toast?.message;

    if (text) {
        saveTimedValue(STATUS_TOAST_STORAGE_KEY, getToastValue(text, toast.variant));
    }
};

export const readStatusToast = () => {
    const toast = readTimedValue(STATUS_TOAST_STORAGE_KEY, STORAGE_MAX_AGE_MS);

    return toast ? getToastValue(toast.text, toast.variant) : null;
};

export const clearStatusToast = () => {
    removeStorageValue(STATUS_TOAST_STORAGE_KEY);
};

const getToastValue = (text, variant) => ({
    text,
    variant: variant || DEFAULT_TOAST_VARIANT,
});
