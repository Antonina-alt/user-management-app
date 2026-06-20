import { useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    return (
        <main className="flex-grow-1 container d-flex align-items-center justify-content-center py-5">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <NotFoundCard path={location.pathname} />
                </div>
            </div>
        </main>
    );
};

const NotFoundCard = ({ path }) => (
    <div className="card border-0 shadow-sm text-center">
        <div className="card-body p-4 p-md-5">
            <div className="not-found-code fw-bold text-primary mb-3">404</div>
            <h1 className="h3 fw-bold mb-3">Page not found</h1>
            <p className="text-secondary mb-2">The page you are looking for does not exist or was moved.</p>
            <p className="small text-muted mb-4">Requested path: <code>{path}</code></p>
        </div>
    </div>
);

export default NotFound;
