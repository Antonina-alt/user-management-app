const FIELD = {
    name: { name: 'name', label: 'Name', type: 'text' },
    email: { name: 'email', label: 'E-mail', type: 'email' },
    password: { name: 'password', label: 'Password', type: 'password' },
};

const LOGIN_INITIAL_VALUES = {
    email: '',
    password: '',
};

const REGISTER_INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
};

export const AUTH_FORM_CONFIGS = {
    login: {
        initialValues: LOGIN_INITIAL_VALUES,
        fields: [FIELD.email, FIELD.password],
        title: 'Sign In to The User Manager App',
        subtitle: 'Start your journey',
        buttonText: 'Sign In',
        bottomText: "Don't have an account?",
        bottomLinkText: 'Sign up',
        errorMessage: 'Login failed. Invalid email or password.',
    },
    register: {
        initialValues: REGISTER_INITIAL_VALUES,
        fields: [FIELD.name, FIELD.email, FIELD.password],
        title: 'Create Your Account',
        subtitle: 'Join us today',
        buttonText: 'Sign Up',
        bottomText: 'Already have an account?',
        bottomLinkText: 'Sign in',
        errorMessage: 'Registration failed.',
    },
};
