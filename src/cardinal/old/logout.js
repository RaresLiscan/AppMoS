import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { cliendId } from '../../configs';

export default function Logout() {
    const onSuccess = () => {
        alert("Te-ai deconectat");
    }

    return (
        <div>
            <GoogleLogout 
                clientId={cliendId}
                buttonText="Delogare"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}