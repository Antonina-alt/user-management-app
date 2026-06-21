import { useEffect } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';

const TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';

const getTooltipElements = () => {
    return Array.from(document.querySelectorAll(TOOLTIP_SELECTOR))
        .filter((element) => element instanceof Element);
};

export const useBootstrapTooltips = (key) => {
    useEffect(() => {
        const elements = getTooltipElements();

        elements.forEach((element) => {
            Tooltip.getOrCreateInstance(element);
        });

        return () => {
            elements.forEach((element) => {
                const tooltip = Tooltip.getInstance(element);

                if (tooltip) {
                    tooltip.dispose();
                }
            });
        };
    }, [key]);
};