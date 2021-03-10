import React from 'react';

export default function GoogleLogin() {

    const registerMember = () => {

    }

    const Login = () => {

    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Loghează-te cu contul tău de G Suite pentru a te înscrie la
                activitate</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Login success={registerMember}/>
            </div>
        </div>
    )

}