import { getStore } from '../shared/redux/store';
import Http from './HttpService';
import * as Actions from '../shared/login/redux/actions';
import decode from 'jwt-decode';


class Auth {

    constructor() {
        this._isAuthenticated = false;
        setTimeout(() => {
            this.store = getStore();

            this.data = this.store.getState().login;
        });    }


    login(credentials) {
        console.log('Credentials: ',credentials)
        return Http.post('/login',credentials);
    }

    register(credentials){
        return Http.post('/register',credentials)
    }

    updateUser(user_id,credentials){
        return Http.put(`/update-user/${user_id}`,credentials)
    }

    isAuthenticated() {

        return this.isTokenExpired();
    }

    setToken(data) {
        // alert('aqui')
        // Saves user token to localStorage
        console.log('This.data: ',this.data)
        this.data.user=data.user
        this.data.token=data.token
        console.log('This.data: ',this.data)
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
        // try {
            console.log('data: ',this.data)
            if(this.data){
                if(this.data.token){
                    console.log('Entrabndo aqui: ',this.data)
                const decoded = decode(this.data.token);
                console.log('Decode: ',decoded)
                console.log('Decode.exp: ',decoded.exp)
                console.log('compare: ',(Date.now() / 1000))
                if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired. N
                    return false;
                }else{
                    console.log('Token expired')
                    return true;
                }
                }else{
                    return false
                }
        }else{
            return false
        }
        // }
        // catch (err) {
        //     console.log('Entra en el catch');
        //     return false;
        // }
    }


    getTokenDecoded() {

        return null;
    }

    logout() {
        this.data = {};
        this._isAuthenticated = false;
        localStorage.clear()
        return this.store.dispatch(Actions.logout());
    }
}

const auth = new Auth();

export default auth;