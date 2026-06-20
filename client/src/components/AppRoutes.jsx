import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import About from '../pages/About.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import NotFound from './NotFound.jsx';
import RequireAuth from './RequireAuth.jsx';

const protectedRoutes = [
    { path: ROUTES.home, element: Home },
    { path: ROUTES.about, element: About },
    { path: '*', element: NotFound },
];

const publicRoutes = [
    { path: ROUTES.login, element: Login },
    { path: ROUTES.register, element: Register },
];

const AppRoutes = ({ user, setUser }) => (
    <Routes>
        {protectedRoutes.map((route) => createProtectedRoute(route, user, setUser))}
        {publicRoutes.map((route) => createPublicRoute(route, user, setUser))}
    </Routes>
);

const createProtectedRoute = ({ path, element: Component }, user, setUser) => (
    <Route key={path} path={path} element={<ProtectedPage user={user} setUser={setUser} Component={Component} />} />
);

const createPublicRoute = ({ path, element: Component }, user, setUser) => (
    <Route key={path} path={path} element={user ? <Navigate to={ROUTES.home} replace /> : <Component setUser={setUser} />} />
);

const ProtectedPage = ({ user, setUser, Component }) => (
    <RequireAuth user={user}>
        <Component user={user} setUser={setUser} />
    </RequireAuth>
);

export default AppRoutes;
