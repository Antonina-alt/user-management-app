import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

const About = () => {
    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <p className="text-primary fw-semibold mb-2">About User Manager</p>
                            <h1 className="fw-bold mb-3">User management dashboard</h1>
                            <p className="text-muted mb-4">
                                This application allows registered users to manage accounts,
                                track user activity, block or unblock selected users, delete users,
                                and confirm accounts by e-mail.
                            </p>

                            <div className="row g-3 mb-4">
                                <InfoCard
                                    title="Account statuses"
                                    text="Users can be unverified, active, or blocked. E-mail confirmation changes unverified accounts to active."
                                />
                                <InfoCard
                                    title="User actions"
                                    text="The toolbar allows multiple user selection, blocking, unblocking, deleting users, and deleting unverified accounts."
                                />
                            </div>

                            <Link to={ROUTES.home} className="btn btn-primary">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const InfoCard = ({ title, text }) => {
    return (
        <div className="col-md-6">
            <div className="border rounded p-3 h-100">
                <h5 className="mb-2">{title}</h5>
                <p className="text-muted mb-0">{text}</p>
            </div>
        </div>
    );
};

export default About;
