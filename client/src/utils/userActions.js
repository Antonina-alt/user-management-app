import { USER_ACTION_MESSAGES } from '../constants/userActionMessages.js';
import { blockUsers, deleteUnverifiedUsers, deleteUsers, unblockUsers } from '../services/userService.js';

const ACTION_CONFIGS = {
    block: { request: blockUsers, messageKey: 'block', logoutFlag: 'isCurrentUserSelected' },
    unblock: { request: unblockUsers, messageKey: 'unblock' },
    delete: { request: deleteUsers, messageKey: 'delete', logoutFlag: 'isCurrentUserSelected' },
    deleteUnverified: { request: deleteUnverifiedUsers, messageKey: 'deleteUnverified', logoutFlag: 'isCurrentUserUnverified' },
};

export const createUserActions = (params) => ({
    block: createAction('block', params),
    unblock: createAction('unblock', params),
    delete: createAction('delete', params),
    deleteUnverified: createAction('deleteUnverified', params),
});

const createAction = (key, params) => {
    const config = ACTION_CONFIGS[key];

    return () => params.runAction(() => runRequest(config, params.selectedIds), getActionOptions(config, params));
};

const runRequest = (config, selectedIds) => {
    return config.request === deleteUnverifiedUsers ? config.request() : config.request(selectedIds);
};

const getActionOptions = (config, params) => ({
    logoutAfterAction: Boolean(config.logoutFlag && params[config.logoutFlag]),
    logoutMessage: USER_ACTION_MESSAGES[config.messageKey].logout,
    fallbackSuccessMessage: USER_ACTION_MESSAGES[config.messageKey].success,
});
