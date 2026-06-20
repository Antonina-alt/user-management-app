import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_REQUIRED_STATE } from '../constants/auth.js';
import { ROUTES } from '../constants/routes.js';
import { readLoginRedirectState } from '../utils/loginRedirectState.js';

const RequireAuth = ({ user, children }) => {
    const location = useLocation();

    return user ? children : <LoginRedirect location={location} />;
};

const LoginRedirect = ({ location }) => {
    return <Navigate to={ROUTES.login} replace state={getLoginRedirectState(location)} />;
};

const getLoginRedirectState = (location) => {
    const savedState = readLoginRedirectState();

    return savedState?.silent ? null : getVisibleRedirectState(savedState, location);
};

const getVisibleRedirectState = (savedState, location) => {
    return savedState?.message ? getSavedState(savedState) : getDefaultState(location);
};

const getSavedState = (state) => ({
    message: state.message,
    variant: state.variant || 'warning',
});

const getDefaultState = (location) => ({
    ...LOGIN_REQUIRED_STATE,
    from: location.pathname,
});

export default RequireAuth;
