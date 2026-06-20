import { ROUTES } from '../constants/routes.js';
import useAuthForm from '../hooks/useAuthForm.js';
import { useRouteStatusToast } from '../hooks/useRouteStatusToast.js';
import AuthForm from './AuthForm.jsx';
import StatusToast from './StatusToast.jsx';

const AuthPage = ({ config, request, setUser, showRouteToast = false }) => {
    const formProps = useAuthPageForm(config, request, setUser);

    return (
        <>
            {showRouteToast && <AuthRouteToast />}
            <AuthForm {...formProps} {...config} />
        </>
    );
};

const useAuthPageForm = (config, request, setUser) => {
    return useAuthForm({
        request,
        setUser,
        redirectTo: ROUTES.home,
        initialValues: config.initialValues,
        errorMessage: config.errorMessage,
    });
};

const AuthRouteToast = () => {
    const { toast, setToast } = useRouteStatusToast();

    return (
        <StatusToast
            message={toast?.text}
            variant={toast?.variant}
            onClose={() => setToast(null)}
        />
    );
};

export default AuthPage;
