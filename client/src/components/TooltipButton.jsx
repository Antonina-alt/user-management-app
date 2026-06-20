const TooltipButton = ({ disabled, tooltip, className, children, onClick, ...props }) => {
    const tooltipProps = getTooltipProps(tooltip);

    return disabled
        ? <DisabledTooltipButton {...props} className={className} tooltipProps={tooltipProps}>{children}</DisabledTooltipButton>
        : <EnabledTooltipButton {...props} className={className} tooltipProps={tooltipProps} onClick={onClick}>{children}</EnabledTooltipButton>;
};

const EnabledTooltipButton = ({ children, className, tooltipProps, onClick, ...props }) => (
    <button {...props} {...tooltipProps} type="button" className={className} onClick={onClick}>{children}</button>
);

const DisabledTooltipButton = ({ children, className, tooltipProps, ...props }) => (
    <span className="d-inline-block" tabIndex="0" {...tooltipProps}>
        <button {...props} type="button" className={`${className} pe-none`} disabled>{children}</button>
    </span>
);

const getTooltipProps = (tooltip) => ({
    'data-bs-toggle': 'tooltip',
    'data-bs-title': tooltip,
});

export default TooltipButton;
