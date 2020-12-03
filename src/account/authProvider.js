import firebase from "firebase";

class AuthProvider {
    constructor() {
        this._authenticated = true;
        this._user = {};
    }

    isAuthenticated() {
        return this._authenticated;
    }

    getUser() {
        return this._user;
    }

    login = (user) => {
        this._user = user;
        this._authenticated = true;
        //TODO: request to the server with the new user
    }
}

export default new AuthProvider();