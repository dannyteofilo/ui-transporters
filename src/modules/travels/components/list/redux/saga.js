import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import Travels from '../../../services/TravelService'
import * as list from './actions';
import * as actions from 'shared/redux/constants';

function* performList(action) {
    try {
        yield put(list.starts());

        const response = yield call(Travels.getTravels);        
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

    yield takeLatest(actions.TRAVELS_PERFORM_FETCH, performList);
}