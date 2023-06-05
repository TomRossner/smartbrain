import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({element}) => {
    const {currentUser, isAuthenticated} = useAuth();

    return !currentUser || !isAuthenticated ? <Navigate to='/sign-in'/> : element;
}

export default ProtectedRoute;