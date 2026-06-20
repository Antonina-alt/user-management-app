import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuthRedirect } from './hooks/useAuthRedirect.js';
import { useCurrentUser } from './hooks/useCurrentUser.js';

function App() {
    const { user, setUser, loading } = useCurrentUser();

    return loading ? <LoadingScreen /> : <Router><AppShell user={user} setUser={setUser} /></Router>;
}

const LoadingScreen = () => <div>Loading...</div>;

const AppShell = ({ user, setUser }) => {
    useAuthRedirect(setUser);

    return (
        <div className="app-shell d-flex flex-column">
            <Navbar user={user} setUser={setUser} />
            <main className="app-shell-main flex-grow-1 d-flex flex-column">
                <AppRoutes user={user} setUser={setUser} />
            </main>
        </div>
    );
};

export default App;
