import { useCallback, useState } from 'react';
import { getErrorMessage } from '../utils/error.js';

export const useUserActionRunner = (refreshUsers, logoutAndGoHome, setError) => {
    const [actionLoading, setActionLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    const runAction = useCallback(async (action, options = {}) => {
        startAction(setActionLoading, setError, setStatusMessage);

        try {
            await completeAction(action, options, refreshUsers, logoutAndGoHome, setStatusMessage);
        } catch (error) {
            showActionError(error, setStatusMessage);
        } finally {
            setActionLoading(false);
        }
    }, [logoutAndGoHome, refreshUsers, setError]);

    return { actionLoading, statusMessage, setStatusMessage, runAction };
};

const startAction = (setActionLoading, setError, setStatusMessage) => {
    setActionLoading(true);
    setError('');
    setStatusMessage(null);
};

const completeAction = async (action, options, refreshUsers, logoutAndGoHome, setStatusMessage) => {
    const { data } = await action();

    if (options.logoutAfterAction) {
        await logoutAndGoHome(options.logoutMessage);
        return;
    }

    await refreshUsers();
    showActionSuccess(data, options.fallbackSuccessMessage, setStatusMessage);
};

const showActionSuccess = (data, fallbackMessage, setStatusMessage) => {
    setStatusMessage({ variant: 'success', text: data?.message || fallbackMessage });
};

const showActionError = (error, setStatusMessage) => {
    setStatusMessage({ variant: 'danger', text: getErrorMessage(error, 'Operation failed. Please try again.') });
};
