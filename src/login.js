import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {cliendId} from './configs';

export default function Login(props) {
    const onSuccess = (res) => {
        const profile = res.profileObj;
        props.success(profile.name, profile.email);
    }

    const onFailure = (res) => {
        alert("Autentificarea nu a reuşit. Încearcă din nou");
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