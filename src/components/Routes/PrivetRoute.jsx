import React, { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';


const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Loader></Loader>
    }
    if (user && user.uid) {
        return children
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivetRoute;