import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-center py-20 text-lg">Loading...</div>;
    }

    if (user) { 
        return children;
    }
    toast.error('You must log in to access this page.');
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;