import { TOAST_AUTO_HIDE_MS } from '../constants/toast.js';
import { useAutoHide } from '../hooks/useAutoHide.js';

const StatusToast = ({ message, variant = 'success', onClose, autoHideMs = TOAST_AUTO_HIDE_MS }) => {
    useAutoHide(Boolean(message), onClose, autoHideMs);

    return message ? <ToastContainer><Toast variant={variant} message={message} onClose={onClose} /></ToastContainer> : null;
};

const ToastContainer = ({ children }) => (
    <div className="toast-container position-fixed bottom-0 end-0 z-3 p-3 text-start status-toast-container">
        {children}
    </div>
);

const Toast = ({ variant, message, onClose }) => (
    <div className={`toast show text-bg-${variant} border-0 shadow text-start`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex align-items-start">
            <div className="toast-body text-start w-100">{message}</div>
            <CloseToastButton onClose={onClose} />
        </div>
    </div>
);

const CloseToastButton = ({ onClose }) => (
    <button type="button" className="btn-close btn-close-white me-2 mt-2" aria-label="Close" onClick={onClose} />
);

export default StatusToast;
