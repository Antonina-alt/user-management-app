import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable.jsx';
import StatusToast from '../components/StatusToast.jsx';
import { getHomeToast } from '../utils/homeToast.js';

const Home = ({ user, setUser }) => {
    const { flashMessage, setFlashMessage } = useHomeFlashMessage();

    return (
        <main className="container py-5">
            <HomeToast flashMessage={flashMessage} setFlashMessage={setFlashMessage} />
            <UsersTable user={user} setUser={setUser} />
        </main>
    );
};

const useHomeFlashMessage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState(null);

    useEffect(() => showHomeToast(location, navigate, setFlashMessage), [location, navigate]);
    return { flashMessage, setFlashMessage };
};

const showHomeToast = (location, navigate, setFlashMessage) => {
    const toast = getHomeToast(location);

    if (toast?.text) {
        setFlashMessage({ text: toast.text, variant: toast.variant || 'success' });
        navigate(location.pathname, { replace: true, state: null });
    }
};

const HomeToast = ({ flashMessage, setFlashMessage }) => (
    <StatusToast
        message={flashMessage?.text}
        variant={flashMessage?.variant}
        onClose={() => setFlashMessage(null)}
    />
);


export default Home;
