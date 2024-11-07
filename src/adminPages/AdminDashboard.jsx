import "../styles/home.css";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className="admin-dashboard-container">
                <AdminHeader />
                <Sidebar
                    visible={visible}
                    position="right"
                    onHide={() => setVisible(false)}
                >
                    <div className="flex flex-col gap-7 items-center">
                        <Link to="/" onClick={() => setVisible(false)}>
                            Home
                        </Link>
                        <Link to="/events" onClick={() => setVisible(false)}>
                            Events
                        </Link>
                        <Link to="/execom" onClick={() => setVisible(false)}>
                            Execom
                        </Link>
                        <Link to="/contacts" onClick={() => setVisible(false)}>
                            Contact
                        </Link>
                    </div>
                </Sidebar>

                <div className="flex-auto">
                    <div className="flex flex-col justify-center items-center h-screen pb-44 sm:pb-32">
                        <div className="relative">
                            <div className="absolute top-1/4 left-1/2 translate-x-[-50%] translate-y-[-85%] w-max text-4xl sm:text-6xl">
                                Welcome to
                            </div>
                            <div className="absolute top-1/4 left-1/2 translate-x-[-50%] w-max text-4xl sm:text-6xl">
                                The Admin Dashboard
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
