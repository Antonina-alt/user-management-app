import { Link } from 'react-router-dom';
import FormField from './FormField.jsx';

const AuthForm = (props) => {
    return (
        <div className="auth-page flex-grow-1 row g-0 bg-white overflow-hidden">
            <AuthPanel {...props} />
            <AuthVisual />
        </div>
    );
};

const AuthPanel = (props) => {
    return (
        <section className="col-12 col-md-6 d-flex align-items-center justify-content-center p-3 p-sm-4 p-md-5">
            <div className="auth-content w-100">
                <AuthHeader title={props.title} subtitle={props.subtitle} />
                <AuthFields {...props} />
                <AuthFooter {...props} />
            </div>
        </section>
    );
};

const AuthHeader = ({ title, subtitle }) => (
    <div className="mb-3 mb-md-4">
        <p className="small text-secondary mb-1">{subtitle}</p>
        <h2 className="h4 fw-bold text-dark mb-0">{title}</h2>
    </div>
);

const AuthFields = (props) => (
    <form onSubmit={props.onSubmit} className="d-flex flex-column gap-2 gap-md-3">
        <FormFields {...props} />
        <AuthError error={props.error} />
        <SubmitButton {...props} />
    </form>
);

const FormFields = ({ fields, form, onChange }) => (
    fields.map((field) => <FormField key={field.name} field={field} value={form[field.name]} onChange={onChange} />)
);

const AuthError = ({ error }) => {
    return error ? <div className="alert alert-danger small mb-0 py-2 px-3">{error}</div> : null;
};

const SubmitButton = ({ isSubmitting, buttonText }) => (
    <button type="submit" className="btn btn-primary fw-semibold py-2 mt-2" disabled={isSubmitting}>
        {isSubmitting ? 'Please wait...' : buttonText}
    </button>
);

const AuthFooter = ({ bottomText, bottomLinkText, bottomLinkTo }) => (
    <p className="small text-secondary mt-3 mt-md-5 pt-2 pt-md-4 mb-0">
        {bottomText}{' '}
        <Link to={bottomLinkTo} className="link-primary text-decoration-none">{bottomLinkText}</Link>
    </p>
);

const AuthVisual = () => <section className="auth-visual d-none d-md-block col-md-6" aria-hidden="true" />;

export default AuthForm;
