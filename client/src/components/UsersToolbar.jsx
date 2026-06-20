import TooltipButton from './TooltipButton.jsx';

const TOOLBAR_BUTTONS = [
    { key: 'block', className: 'btn btn-outline-primary', needsSelection: true, text: 'Block', active: 'Block selected users', disabled: 'Select at least one user to block' },
    { key: 'unblock', className: 'btn btn-outline-primary', needsSelection: true, icon: 'bi bi-unlock-fill', active: 'Unblock selected users', disabled: 'Select at least one user to unblock' },
    { key: 'delete', className: 'btn btn-outline-danger', needsSelection: true, icon: 'bi bi-trash-fill', active: 'Delete selected users', disabled: 'Select at least one user to delete' },
    { key: 'deleteUnverified', className: 'btn btn-outline-danger', needsUnverified: true, icon: 'bi bi-person-x-fill', active: 'Delete all unverified users', disabled: 'There are no unverified users to delete' },
];

const UsersToolbar = (props) => (
    <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap bg-light border rounded p-3 mb-3">
        <div className="btn-toolbar" role="toolbar" aria-label="User management toolbar">
            <div className="btn-group me-2" role="group" aria-label="Selected users actions">
                {createButtons(props).map((button) => <ToolbarButton key={button.key} button={button} />)}
            </div>
        </div>
    </div>
);

const createButtons = (props) => {
    return TOOLBAR_BUTTONS.map((config) => createButton(config, props));
};

const createButton = (config, props) => {
    const enabled = isButtonEnabled(config, props);

    return {
        ...config,
        disabled: !enabled || props.actionLoading,
        onClick: props.actions[config.key],
        tooltip: enabled ? config.active : config.disabled,
    };
};

const isButtonEnabled = (config, props) => {
    return config.needsUnverified ? props.hasUnverifiedUsers : props.hasSelectedUsers;
};

const ToolbarButton = ({ button }) => (
    <TooltipButton {...getButtonProps(button)}>
        {button.icon ? <i className={button.icon}></i> : button.text}
    </TooltipButton>
);

const getButtonProps = ({ className, disabled, onClick, active, tooltip }) => ({
    className,
    disabled,
    onClick,
    tooltip,
    'aria-label': active,
});

export default UsersToolbar;
