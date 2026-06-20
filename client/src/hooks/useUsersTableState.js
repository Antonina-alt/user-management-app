import { useMemo } from 'react';
import { USER_STATUS } from '../constants/userTable.js';
import { getUserById, hasUserStatus, includesId } from '../utils/userTableUtils.js';

export const useUsersTableState = (users, selectedIds, currentUserId, actionLoading) => {
    return useMemo(
        () => createTableState(users, selectedIds, currentUserId, actionLoading),
        [users, selectedIds, currentUserId, actionLoading]
    );
};

export const getUsersTableTooltipKey = (selectedIds, tableState) => {
    return `${selectedIds.join(',')}-${tableState.actionLoading}-${tableState.hasUnverifiedUsers}`;
};

const createTableState = (users, selectedIds, currentUserId, actionLoading) => {
    const currentUser = getUserById(users, currentUserId);

    return {
        actionLoading,
        hasSelectedUsers: selectedIds.length > 0,
        hasUnverifiedUsers: hasUserStatus(users, USER_STATUS.unverified),
        isCurrentUserSelected: includesId(selectedIds, currentUserId),
        isCurrentUserUnverified: currentUser?.verification_status === USER_STATUS.unverified,
    };
};
