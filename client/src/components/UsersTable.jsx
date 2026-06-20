import { useCallback, useMemo, useRef } from 'react';
import DataTable from '../utils/dataTable.js';
import StatusToast from './StatusToast.jsx';
import UserTableHeaders from './UserTableHeaders.jsx';
import UsersToolbar from './UsersToolbar.jsx';
import { USER_TABLE_COLUMNS, USER_TABLE_OPTIONS } from '../constants/userTable.js';
import { useBootstrapTooltips } from '../hooks/useBootstrapTooltips.js';
import { useLogoutAndGoLogin } from '../hooks/useLogoutAndGoLogin.js';
import { useSelectedUsers } from '../hooks/useSelectedUsers.js';
import { useUserActionRunner } from '../hooks/useUserActionRunner.js';
import { useUsers } from '../hooks/useUsers.js';
import { getUsersTableTooltipKey, useUsersTableState } from '../hooks/useUsersTableState.js';
import { createUserActions } from '../utils/userActions.js';

const UsersTable = ({ user, setUser }) => {
    const viewModel = useUsersTable(user, setUser);

    return viewModel.loading ? <LoadingUsers /> : <UsersCard {...viewModel} />;
};

const useUsersTable = (user, setUser) => {
    const tableRef = useRef(null);
    const usersState = useUsers();
    const selected = useSelectedUsers(tableRef);
    const refreshUsers = useRefreshUsers(usersState.loadUsers, selected.clearSelection);
    const actionRunner = useTableActions(user, setUser, usersState, selected, refreshUsers);

    useBootstrapTooltips(getUsersTableTooltipKey(selected.selectedIds, actionRunner.tableState));

    return { tableRef, usersState, selected, actionRunner, loading: usersState.loading };
};

const useTableActions = (user, setUser, usersState, selected, refreshUsers) => {
    const logoutAndGoLogin = useLogoutAndGoLogin(setUser);
    const actionRunner = useUserActionRunner(refreshUsers, logoutAndGoLogin, usersState.setError);
    const tableState = useUsersTableState(usersState.users, selected.selectedIds, user?.id, actionRunner.actionLoading);
    const actions = useActions(selected.selectedIds, tableState, actionRunner.runAction);

    return { ...actionRunner, tableState, actions };
};

const useActions = (selectedIds, tableState, runAction) => {
    return useMemo(
        () => createUserActions({ ...tableState, selectedIds, runAction }),
        [runAction, selectedIds, tableState]
    );
};

const useRefreshUsers = (loadUsers, clearSelection) => {
    return useCallback(async () => {
        await loadUsers();
        clearSelection();
    }, [clearSelection, loadUsers]);
};

const LoadingUsers = () => <div className="text-center py-4">Loading users...</div>;

const UsersCard = ({ tableRef, usersState, selected, actionRunner }) => (
    <div className="card shadow-sm">
        <div className="card-header"><h5 className="mb-0">Users</h5></div>
        <div className="card-body">
            <UsersCardBody tableRef={tableRef} usersState={usersState} selected={selected} actionRunner={actionRunner} />
        </div>
    </div>
);

const UsersCardBody = ({ tableRef, usersState, selected, actionRunner }) => (
    <>
        <ActionToast actionRunner={actionRunner} />
        <UsersError error={usersState.error} />
        <UsersToolbar {...actionRunner.tableState} actions={actionRunner.actions} />
        <UsersDataTable tableRef={tableRef} users={usersState.users} selected={selected} />
    </>
);

const ActionToast = ({ actionRunner }) => (
    <StatusToast
        message={actionRunner.statusMessage?.text}
        variant={actionRunner.statusMessage?.variant}
        onClose={() => actionRunner.setStatusMessage(null)}
    />
);

const UsersError = ({ error }) => {
    return error ? <div className="alert alert-danger">{error}</div> : null;
};

const UsersDataTable = ({ tableRef, users, selected }) => (
    <DataTable
        ref={tableRef}
        data={users}
        columns={USER_TABLE_COLUMNS}
        className="table table-hover table-bordered align-middle w-100"
        onSelect={selected.syncSelectedIds}
        onDeselect={selected.syncSelectedIds}
        options={USER_TABLE_OPTIONS}
    >
        <UserTableHeaders />
    </DataTable>
);

export default UsersTable;
