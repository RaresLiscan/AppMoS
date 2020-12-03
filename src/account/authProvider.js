
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
}

export default new AuthProvider();