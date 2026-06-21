import { useState } from 'react';

const FormField = ({ field, value, onChange }) => {
    const isPassword = field.type === 'password';

    return (
        <div>
            <label className="form-label small text-secondary mb-2">{field.label}</label>
            {isPassword
                ? <PasswordInput field={field} value={value} onChange={onChange} />
                : <FieldInput field={field} value={value} onChange={onChange} />}
        </div>
    );
};

const PasswordInput = ({ field, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const type = showPassword ? 'text' : 'password';

    return (
        <div className="input-group">
            <FieldInput field={field} value={value} onChange={onChange} type={type} />
            <PasswordToggleButton showPassword={showPassword} onClick={() => setShowPassword(!showPassword)} />
        </div>
    );
};

const PasswordToggleButton = ({ showPassword, onClick }) => (
    <button
        type="button"
        className="btn btn-light border text-secondary"
        onClick={onClick}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
    </button>
);

const FieldInput = ({ field, value, onChange, type = field.type }) => (
    <input
        className="form-control py-2"
        type={type}
        name={field.name}
        value={value}
        onChange={onChange}
        maxLength={field.maxLength}
        required
    />
);

export default FormField;