import { DT } from '../utils/dataTable.js';
import { renderDateTime, renderStatus } from '../utils/userTableUtils.js';

export const USER_STATUS = {
    unverified: 'unverified',
};

export const USER_TABLE_COLUMNS = [
    {
        data: null,
        title: '',
        defaultContent: '',
        orderable: false,
        searchable: false,
        className: 'text-center',
        width: '44px',
        render: DT.render.select(),
    },
    { data: 'name', title: 'Name' },
    { data: 'email', title: 'E-mail' },
    { data: 'last_login_time', title: 'Last login time', render: renderDateTime },
    { data: 'last_activity_time', title: 'Last activity time', render: renderDateTime },
    { data: 'status', title: 'Status', render: renderStatus },
    { data: 'registration_time', title: 'Registration time', render: renderDateTime },
];

export const USER_TABLE_HEADERS = USER_TABLE_COLUMNS.map(({ title }) => title);

export const USER_TABLE_OPTIONS = {
    responsive: true,
    pageLength: 5,
    lengthMenu: [5, 10, 25, 50],
    order: [[3, 'desc']],
    select: {
        style: 'multi',
        selector: 'td:first-child',
        headerCheckbox: 'select-all',
    },
    language: {
        lengthMenu: '_MENU_ users per page',
        info: 'Showing _START_ to _END_ of _TOTAL_ users',
        infoEmpty: 'Showing 0 to 0 of 0 users',
        infoFiltered: '(filtered from _MAX_ total users)',
        zeroRecords: 'No users found',
        search: 'Search:',
    },
    layout: {
        topStart: 'pageLength',
        topEnd: 'search',
        bottomStart: 'info',
        bottomEnd: 'paging',
    },
};
