import { DEFAULT_TOAST_VARIANT } from '../constants/toast.js';
import { clearStatusToast, readStatusToast } from './statusToastStorage.js';

export const getHomeToast = (location) => {
    const storedToast = getStoredToast();

    return getLocationToast(location.state) || getEmailConfirmationToast(location.search) || storedToast;
};

const getLocationToast = (state) => {
    return state?.message ? createToast(state.message, state.variant) : null;
};

const getEmailConfirmationToast = (search) => {
    const params = new URLSearchParams(search);
    const emailConfirmed = params.get('emailConfirmed');

    return isEmailConfirmationStatus(emailConfirmed) ? createEmailConfirmationToast(emailConfirmed, params) : null;
};

const isEmailConfirmationStatus = (value) => {
    return ['0', '1'].includes(value);
};

const createEmailConfirmationToast = (emailConfirmed, params) => ({
    text: getEmailConfirmationText(emailConfirmed, params.get('message')),
    variant: emailConfirmed === '0' ? 'danger' : 'success',
});

const getEmailConfirmationText = (emailConfirmed, message) => {
    return emailConfirmed === '1'
        ? 'E-mail confirmed successfully. Your account is now active.'
        : message || 'Confirmation link is invalid or expired.';
};

const getStoredToast = () => {
    const toast = readStatusToast();

    clearStatusToast();
    return toast;
};

const createToast = (text, variant) => ({
    text,
    variant: variant || DEFAULT_TOAST_VARIANT,
});
