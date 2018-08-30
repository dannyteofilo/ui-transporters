import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import Travels from '../../../services/TravelService'
import * as list from './actions';
import * as actions from 'shared/redux/constants';



function* performCreate(action) {
    try {
        yield put(list.starts());

        const response = yield call(Travels.create,action.payload);        
        yield put(list.success(response));
    } catch (error) {
        yield put(list.fails({
            error
        }));
    } finally {
        yield put(list.ends());
    }
}

function* performUpdate(action) {
    try {
        yield put(list.starts());

        const response = yield call(Travels.update,action.id,action.payload);        
        yield put(list.success(response));
    } catch (error) {
        yield put(list.fails({
            error
        }));
    } finally {
        yield put(list.ends());
    }
}

function* performDelete(action) {
    try {
        yield put(list.starts());

        const response = yield call(Travels.delete,action.id);        
        yield put(list.success(response));
    } catch (error) {
        yield put(list.fails({
            error
        }));
    } finally {
        yield put(list.ends());
    }
}


export default function* watchFetch() {

    yield takeLatest(actions.TRAVELS_CREATE_PERFORM_FETCH, performCreate);
    yield takeLatest(actions.TRAVELS_UPDATE_PERFORM_FETCH, performUpdate);
    yield takeLatest(actions.TRAVELS_DELETE_PERFORM_FETCH, performDelete);




}