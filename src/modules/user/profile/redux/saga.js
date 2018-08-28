import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import User from '../../services/userService';
import * as image from './actions';
import * as actions from 'shared/redux/constants';

function* getAvatar(action) {
    try {
        yield put(image.starts());

        const response = yield call(User.getAvatar,action.payload);
        yield put(image.success(response));
    } catch (error) {
        yield put(image.fails({
            error
        }));
    } finally {
        yield put(image.ends());
    }
}


export default function* watchSignIn() {

    yield takeLatest(actions.AVATAR_PERFORM_PROFILE, getAvatar);


}