import { useEffect } from 'react';

export const useAutoHide = (enabled, onClose, delay) => {
    useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        const timerId = setTimeout(onClose, delay);

        return () => clearTimeout(timerId);
    }, [enabled, delay, onClose]);
};
