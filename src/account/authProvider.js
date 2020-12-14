import firebase from "firebase";

class AuthProvider {
    constructor() {
        this._authenticated = false;
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
        
    }
}

export default new AuthProvider();