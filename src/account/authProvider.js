import firebase from "firebase";

//clasa in care retinem daca utilizatorul este sau nu autentificat + metodele de login, logout, sign up
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