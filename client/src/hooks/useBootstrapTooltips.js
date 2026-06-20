import { useEffect } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';

const getTooltipElements = () => {
    return Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
};

export const useBootstrapTooltips = (key) => {
    useEffect(() => {
        const tooltips = getTooltipElements().map((element) => Tooltip.getOrCreateInstance(element));

        return () => tooltips.forEach((tooltip) => tooltip.dispose());
    }, [key]);
};
