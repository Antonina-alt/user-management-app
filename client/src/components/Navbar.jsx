import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { NAV_LINKS } from '../constants/navbar.js';
import { ROUTES } from '../constants/routes.js';
import { useLogoutAndGoLogin } from '../hooks/useLogoutAndGoLogin.js';

const Navbar = ({ user, setUser }) => {
    const navbar = useNavbar(setUser);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm px-3 px-md-4 py-3">
            <BrandLink user={user} onClick={navbar.closeMenu} />
            <NavbarToggler isOpen={navbar.isOpen} onClick={navbar.toggleMenu} />
            <NavbarContent user={user} navbar={navbar} />
        </nav>
    );
};

const useNavbar = (setUser) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const logoutAndGoLogin = useLogoutAndGoLogin(setUser);

    return createNavbarState(location.pathname, isOpen, setIsOpen, logoutAndGoLogin);
};

const createNavbarState = (currentPath, isOpen, setIsOpen, logoutAndGoLogin) => {
    const closeMenu = () => setIsOpen(false);

    return {
        isOpen,
        currentPath,
        closeMenu,
        toggleMenu: () => setIsOpen((previousValue) => !previousValue),
        logout: () => handleLogout(logoutAndGoLogin, closeMenu),
    };
};

const handleLogout = async (logoutAndGoLogin, closeMenu) => {
    await logoutAndGoLogin();
    closeMenu();
};

const BrandLink = ({ user, onClick }) => (
    <Link to={user ? ROUTES.home : ROUTES.login} className="navbar-brand fs-4 fw-bold" onClick={onClick}>User Manager</Link>
);

const NavbarToggler = ({ isOpen, onClick }) => (
    <button className="navbar-toggler" type="button" aria-controls="mainNavbar" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={onClick}>
        <span className="navbar-toggler-icon" />
    </button>
);

const NavbarContent = ({ user, navbar }) => (
    <div id="mainNavbar" className={`collapse navbar-collapse ${navbar.isOpen ? 'show' : ''}`}>
        <NavLinks user={user} currentPath={navbar.currentPath} onClick={navbar.closeMenu} />
        <NavbarActions user={user} onLogout={navbar.logout} onClick={navbar.closeMenu} />
    </div>
);

const NavLinks = ({ user, currentPath, onClick }) => {
    return user ? <UserNavLinks currentPath={currentPath} onClick={onClick} /> : <div className="me-auto" />;
};

const UserNavLinks = ({ currentPath, onClick }) => (
    <ul className="navbar-nav ms-md-4 me-auto mt-3 mt-md-0">
        {NAV_LINKS.map((link) => <NavLinkItem key={link.to} link={link} currentPath={currentPath} onClick={onClick} />)}
    </ul>
);

const NavLinkItem = ({ link, currentPath, onClick }) => (
    <li className="nav-item">
        <Link to={link.to} className={`nav-link ${currentPath === link.to ? 'active' : ''}`} onClick={onClick}>{link.label}</Link>
    </li>
);

const NavbarActions = ({ user, onLogout, onClick }) => (
    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 mt-3 mt-md-0">
        {user ? <UserActions user={user} onLogout={onLogout} /> : <GuestActions onClick={onClick} />}
    </div>
);

const UserActions = ({ user, onLogout }) => (
    <>
        <span className="navbar-text text-white-50 small d-none d-md-inline">{user.email}</span>
        <button type="button" onClick={onLogout} className="btn btn-danger btn-sm fw-medium px-3">Logout</button>
    </>
);

const GuestActions = ({ onClick }) => (
    <>
        <ActionLink to={ROUTES.login} className="btn btn-primary btn-sm fw-medium px-3" onClick={onClick}>Sign in</ActionLink>
        <ActionLink to={ROUTES.register} className="btn btn-outline-light btn-sm fw-medium px-3" onClick={onClick}>Sign up</ActionLink>
    </>
);

const ActionLink = ({ to, className, onClick, children }) => (
    <Link to={to} className={className} onClick={onClick}>{children}</Link>
);

export default Navbar;
