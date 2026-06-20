const FormField = ({ field, value, onChange }) => {
    return (
        <div>
            <label className="form-label small text-secondary mb-2">{field.label}</label>
            <FieldInput field={field} value={value} onChange={onChange} />
        </div>
    );
};

const FieldInput = ({ field, value, onChange }) => (
    <input
        className="form-control py-2"
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        required
    />
);

export default FormField;
