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

function* performUserUpdateWithImage(action){
    try {
        yield put(login.starts());
        const image= yield call(Auth.updateUserAvatar,action.id,null, action.file);
        const response= yield call(Auth.updateUser,action.id,action.payload);

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
    yield takeLatest(actions.LOGIN_PERFORM_UPDATE_WITH_IMAGE, performUserUpdateWithImage);

}