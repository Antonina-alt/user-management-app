const BADGE_CLASS_BY_STATUS = {
    active: 'text-bg-success',
    blocked: 'text-bg-secondary',
    unverified: 'text-bg-warning',
};

export const getUniqIdValue = (user) => Number(user.id);

export const formatDateTime = (value) => {
    if (!value) {
        return '—';
    }

    return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
};

export const renderDateTime = (data, type) => {
    return type === 'sort' || type === 'type' ? data || '' : formatDateTime(data);
};

export const renderStatus = (status, type) => {
    const badgeClass = BADGE_CLASS_BY_STATUS[status] || 'text-bg-light';

    return type === 'display' ? `<span class="badge ${badgeClass}">${status}</span>` : status;
};

export const getSelectedRowIds = (table) => {
    return table.rows({ selected: true }).data().toArray().map(getUniqIdValue).filter(Number.isInteger);
};

export const hasUserStatus = (users, status) => {
    return users.some((user) => user.verification_status === status);
};

export const getUserById = (users, id) => {
    return users.find((user) => Number(user.id) === Number(id));
};

export const includesId = (ids, id) => {
    return ids.map(Number).includes(Number(id));
};

const escapeHtml = (value = '') => {
    return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
};

export const renderTruncatedText = (data, type) => {
    if (type !== 'display') {
        return data || '';
    }

    const safeText = escapeHtml(data);

    return `
        <span
            class="d-inline-block text-truncate user-table-text"
            data-bs-toggle="tooltip"
            data-bs-title="${safeText}"
            data-bs-trigger="hover focus"
            data-bs-placement="top"
            data-bs-container="body"
            tabindex="0"
            aria-label="${safeText}"
        >
            ${safeText}
        </span>
    `;
};
