import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {cliendId} from './configs';

export default function Login() {
    const onSuccess = (res) => {
        console.log("Login successful. Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login failed. Response: ", res);
    }

    return (
        <div>
            <GoogleLogin 
                clientId={"903421930963-1ge1ojfih185tjue4mivq6l6o559s79c.apps.googleusercontent.com"}
                buttonText="Autentificare"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                style={{marginTop: '2%'}}
                isSignedIn={false}
            />
        </div>
    )
}