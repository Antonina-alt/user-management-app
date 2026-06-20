import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../utils/error.js';
import { saveStatusToast } from '../utils/statusToastStorage.js';

const useAuthForm = (config) => {
    const [form, setForm] = useState(config.initialValues);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    return getAuthFormState({ config, form, setForm, error, setError, submitting, setSubmitting, navigate });
};

const getAuthFormState = (params) => ({
    form: params.form,
    error: params.error,
    isSubmitting: params.submitting,
    onChange: (event) => handleChange(event, params),
    onSubmit: (event) => handleSubmit(event, params),
});

const handleChange = (event, { setForm, error, setError }) => {
    updateForm(event, setForm);
    clearError(error, setError);
};

const updateForm = (event, setForm) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({ ...previousForm, [name]: value }));
};

const clearError = (error, setError) => {
    if (error) {
        setError('');
    }
};

const handleSubmit = (event, params) => {
    event.preventDefault();
    submitForm(params);
};

const submitForm = async ({ config, form, setError, setSubmitting, navigate }) => {
    startSubmit(setError, setSubmitting);

    try {
        await submitRequest(config, form, navigate);
    } catch (error) {
        setError(getErrorMessage(error, config.errorMessage));
    } finally {
        setSubmitting(false);
    }
};

const startSubmit = (setError, setSubmitting) => {
    setError('');
    setSubmitting(true);
};

const submitRequest = async (config, form, navigate) => {
    const { data } = await config.request(form);

    updateAuthenticatedUser(config, data);
    saveSuccessToast(data);
    redirectAfterSubmit(config.redirectTo, data, navigate);
};

const updateAuthenticatedUser = ({ setUser }, data) => {
    if (data?.user) {
        setUser(data.user);
    }
};

const saveSuccessToast = (data) => {
    const successState = getSuccessState(data);

    if (successState) {
        saveStatusToast(successState);
    }
};

const redirectAfterSubmit = (redirectTo, data, navigate) => {
    navigate(redirectTo, { replace: true, state: getSuccessState(data) });
};

const getSuccessState = (data) => {
    return data?.message ? { message: data.message, variant: 'success' } : null;
};

export default useAuthForm;
