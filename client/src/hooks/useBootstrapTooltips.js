import { useEffect } from 'react';
import Tooltip from 'bootstrap/js/dist/tooltip';

const TOOLTIP_SELECTOR = '[data-bs-toggle="tooltip"]';

const TOOLTIP_OPTIONS = {
    trigger: 'hover focus',
    container: 'body',
};

const OBSERVER_OPTIONS = {
    childList: true,
    subtree: true,
};

const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"], .btn, .btn-group';

const isElement = (element) => {
    return element instanceof Element;
};

const isInteractiveElement = (element) => {
    return element.matches(INTERACTIVE_SELECTOR);
};

const getTooltipElements = () => {
    return Array.from(document.querySelectorAll(TOOLTIP_SELECTOR)).filter(isElement);
};

const normalizeTooltipElement = (element) => {
    moveTitleToBootstrapTitle(element);
    element.setAttribute('data-bs-trigger', TOOLTIP_OPTIONS.trigger);
    element.setAttribute('data-bs-container', TOOLTIP_OPTIONS.container);
};

const moveTitleToBootstrapTitle = (element) => {
    const title = element.getAttribute('title');

    if (title && !element.hasAttribute('data-bs-title')) {
        element.setAttribute('data-bs-title', title);
    }

    element.removeAttribute('title');
};

const initTooltip = (element) => {
    normalizeTooltipElement(element);
    bindTooltipEvents(element);
    Tooltip.getOrCreateInstance(element, TOOLTIP_OPTIONS);
};

const bindTooltipEvents = (element) => {
    element.addEventListener('click', hideTooltipAfterInteractiveClick);
};

const unbindTooltipEvents = (element) => {
    element.removeEventListener('click', hideTooltipAfterInteractiveClick);
};

const hideTooltipAfterInteractiveClick = (event) => {
    const element = event.currentTarget;

    if (isInteractiveElement(element)) {
        hideTooltip(element);
        blurElement(element);
    }
};

const hideTooltip = (element) => {
    Tooltip.getInstance(element)?.hide();
};

const blurElement = (element) => {
    if (element instanceof HTMLElement) {
        element.blur();
    }
};

const disposeTooltip = (element) => {
    unbindTooltipEvents(element);
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