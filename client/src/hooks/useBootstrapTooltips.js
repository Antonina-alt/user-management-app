import { useEffect } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';

const TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';

const OBSERVER_OPTIONS = {
    childList: true,
    subtree: true,
};

const isElement = (element) => {
    return element instanceof Element;
};

const getTooltipElements = () => {
    return Array.from(document.querySelectorAll(TOOLTIP_SELECTOR)).filter(isElement);
};

const initTooltip = (element) => {
    Tooltip.getOrCreateInstance(element);
};

const disposeTooltip = (element) => {
    Tooltip.getInstance(element)?.dispose();
};

const initTooltips = () => {
    getTooltipElements().forEach(initTooltip);
};

const disposeTooltips = () => {
    getTooltipElements().forEach(disposeTooltip);
};

const createRafScheduler = (callback) => {
    let frameId = null;

    const cancel = () => {
        if (frameId !== null) cancelAnimationFrame(frameId);
    };

    const schedule = () => {
        cancel();
        frameId = requestAnimationFrame(callback);
    };

    return { schedule, cancel };
};

const observeDomChanges = (callback) => {
    const observer = new MutationObserver(callback);

    observer.observe(document.body, OBSERVER_OPTIONS);

    return () => observer.disconnect();
};

export const useBootstrapTooltips = (key) => {
    useEffect(() => {
        const scheduler = createRafScheduler(initTooltips);
        const stopObserving = observeDomChanges(scheduler.schedule);

        scheduler.schedule();

        return () => {
            scheduler.cancel();
            stopObserving();
            disposeTooltips();
        };
    }, [key]);
};