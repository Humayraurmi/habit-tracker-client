import React, { use, useRef } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    const hasShownToast = useRef(false);

    if (loading) {
        return <div className="text-center py-20 text-lg">Loading...</div>;
    }

    if (user) {
        hasShownToast.current = false;
        return children;
    }

    if (!user && !hasShownToast.current) {
        toast.error('You must log in to access this page.');
        hasShownToast.current = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;