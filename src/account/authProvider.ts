import firebase from "firebase";
import User from './user.model';
import axios from 'axios';

const API_URL = "http://localhost/rapoarte/users";
//clasa in care retinem daca utilizatorul este sau nu autentificat + metodele de login, logout, sign up
class AuthProvider {

    private _authenticated : Boolean;
    private _user : Object;
    
    constructor() {
        this._authenticated = false;
        this._user = new Object();
    }

    isAuthenticated() {
        return this._authenticated;
    }

    getUser() {
        return this._user;
    }

    login = (user : User) => {
        this._user = user;
        this._authenticated = true;
        return this.authServerRequest(user);
    }

    authServerRequest = async (user : User) => {
        return await axios.post(`${API_URL}/register/`, user.toJsonFormat())
            .then(response => {
                this._user = response.data;
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

export default new AuthProvider();