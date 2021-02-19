import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from '@material-ui/core/Button';


const CLIENT_ID = '903421930963-1ge1ojfih185tjue4mivq6l6o559s79c.apps.googleusercontent.com';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {

        console.log(response);

        if (response.accessToken) {

            this.props.registerMember();
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken
            }));
        }
    }

    logout(response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
    }

    handleLoginFailure(response) {
        alert('Failed to log in');
        console.log(response);
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }

    render() {
        return (
            <div>
                { this.state.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Delogare'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText='Autentificare'
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</Button>
                          )}
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
                {/* { this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null} */}

            </div>
        )
    }
}

export default GoogleBtn;