import React from 'react';
import authProvider from './authProvider';
import {Route, Redirect} from "react-router-dom";

//Nu lasa utilizatorul sa mearga la o anumita pagina daca el nu este logat
export default function ProtectedRoute({children, ...rest}) {
    if (authProvider.isAuthenticated()) {
        return (
            <Route {...rest}>
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