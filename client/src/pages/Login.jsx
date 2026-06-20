import AuthPage from '../components/AuthPage.jsx';
import { AUTH_FORM_CONFIGS } from '../constants/authForms.js';
import { ROUTES } from '../constants/routes.js';
import { login } from '../services/authService.js';

const Login = ({ setUser }) => {
    return (
        <AuthPage
            config={{ ...AUTH_FORM_CONFIGS.login, bottomLinkTo: ROUTES.register }}
            request={login}
            setUser={setUser}
            showRouteToast
        />
    );
};

export default Login;
