import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import Auth from 'services/AuthService';
import * as login from './actions';
import * as actions from '../../../shared/redux/constants';

function* performSignIn(action) {
    try {
        yield put(login.starts());

        const response = yield call(Auth.login, action.payload);
        
        yield put(login.success(response.data));

        Auth.setToken(response.data);
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
}