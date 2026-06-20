export const saveTimedValue = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify({ ...value, createdAt: Date.now() }));
};

export const readTimedValue = (key, maxAge) => {
    const value = readJsonValue(key);

    return value && !isExpired(value, maxAge) ? value : clearAndReturnNull(key);
};

export const removeStorageValue = (key) => {
    sessionStorage.removeItem(key);
};

const readJsonValue = (key) => {
    try {
        return parseStorageValue(sessionStorage.getItem(key));
    } catch {
        return clearAndReturnNull(key);
    }
};

const parseStorageValue = (value) => {
    return value ? JSON.parse(value) : null;
};

const isExpired = (value, maxAge) => {
    return !value.createdAt || Date.now() - value.createdAt > maxAge;
};

const clearAndReturnNull = (key) => {
    removeStorageValue(key);
    return null;
};
