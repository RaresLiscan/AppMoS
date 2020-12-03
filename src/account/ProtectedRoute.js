import React from 'react';
import authProvider from './authProvider';
import {Route, Redirect} from "react-router-dom";

export default function ProtectedRoute({children, ...rest}) {
    if (authProvider.isAuthenticated()) {
        return (
            <Route>
                {children}
            </Route>
        )
    }
    else {
        return (
            <Redirect to={"/login"} />
        )
    }
}