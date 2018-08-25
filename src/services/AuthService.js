import { getStore } from '../shared/redux/store';
import Http from './HttpService';
import * as Actions from '../shared/login/redux/actions';
import decode from 'jwt-decode';


class Auth {

    constructor() {
        this._isAuthenticated = false;
        setTimeout(() => {
            this.store = getStore();

            this.data = this.store.getState().login.token;
        });    }


    login(credentials) {
        console.log('Credentials: ',credentials)
        return Http.post('/login',credentials);
    }

    register(credentials){
        return Http.post('/register',credentials)
    }

    isAuthenticated() {

        return !this.isTokenExpired()&&this.data;
    }

    setToken(token) {
        // Saves user token to localStorage
        this.data=token
    }

    getUser() {
        if (this.isAuthenticated()) {
            return this.data.user;
        }

        return null;
    }

    getToken() {
        if (this.isTokenExpired()) {
            return this.data.token;
        }

        return null;
    }

    isTokenExpired() {
        try {
            const decoded = decode(this.data.token);
            console.log('Decode: ',decoded)
            console.log('Decode.exp: ',decoded.exp)
            console.log('compare: ',(Date.now() / 1000))
            if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired. N
                return true;
            }else{
                console.log('Token expired')
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }


    getTokenDecoded() {

        return null;
    }

    logout() {
        this.data = null;
        this._isAuthenticated = false;
        localStorage.clear()
        return this.store.dispatch(Actions.logout());
    }
}

const auth = new Auth();

export default auth;