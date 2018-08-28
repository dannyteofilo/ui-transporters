import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import Vehicle from '../../../services/VehicleService'
import * as list from './actions';
import * as actions from 'shared/redux/constants';

function* performList(action) {
    try {
        yield put(list.starts());

        const response = yield call(Vehicle.getVehicles);        
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

    yield takeLatest(actions.VEHICLE_PERFORM_FETCH, performList);
}