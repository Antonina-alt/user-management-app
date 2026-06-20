import AuthPage from '../components/AuthPage.jsx';
import { AUTH_FORM_CONFIGS } from '../constants/authForms.js';
import { ROUTES } from '../constants/routes.js';
import { register } from '../services/authService.js';

const Register = ({ setUser }) => {
    return (
        <AuthPage
            config={{ ...AUTH_FORM_CONFIGS.register, bottomLinkTo: ROUTES.login }}
            request={register}
            setUser={setUser}
        />
    );
};

export default Register;
