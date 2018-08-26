import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import Auth from 'services/AuthService';
import * as login from './actions';
import * as actions from 'shared/redux/constants';

function* performSignIn(action) {
    try {
        yield put(login.starts());

        const response = yield call(Auth.login, action.payload);
        
        yield put(login.success(response));
        Auth.setToken(response)
console.log('Responde: ',response)
        // Auth.setToken(response.data.token);
    } catch (error) {
        yield put(login.fails({
            error
        }));
    } finally {
        yield put(login.ends());
    }
}

function* performSignUp(action) {
    try {
        yield put(login.starts());

        const response = yield call(Auth.register, action.payload);
        
        yield put(login.success(response));

        Auth.setToken(response);
    } catch (error) {
        yield put(login.fails({
            error
        }));
    } finally {
        yield put(login.ends());
    }
}

function* performUserUpdate(action) {
    try {
        yield put(login.starts());

        const response = yield call(Auth.updateUser,action.id, action.payload);
        console.log('Data responde: ',response)
        yield put(login.success(response));

        Auth.setToken(response);
    } catch (error) {
        yield put(login.fails({
            error
        }));
    } finally {
        yield put(login.ends());
    }
}

export default function* watchSignIn() {

    yield takeLatest(actions.LOGIN_PERFORM_LOGIN, performSignIn);
    yield takeLatest(actions.LOGIN_PERFORM_REGISTER, performSignUp);
    yield takeLatest(actions.LOGIN_PERFORM_UPDATE, performUserUpdate);

}