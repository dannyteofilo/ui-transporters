import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import Vehicle from '../../../services/VehicleService'
import * as list from './actions';
import * as actions from 'shared/redux/constants';

function* performUpdate(action) {
    try {
        yield put(list.starts());

        const response = yield call(Vehicle.put,action.id,action.payload);        
        yield put(list.success(response));
    } catch (error) {
        yield put(list.fails({
            error
        }));
    } finally {
        yield put(list.ends());
    }
}

function* performCreate(action) {
    console.log('Saga: ',action)
    try {
        yield put(list.starts());

        const response = yield call(Vehicle.create,action.payload);        
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

    yield takeLatest(actions.VEHICLE_UPDATE_PERFORM_FETCH, performUpdate);
    yield takeLatest(actions.VEHICLE_PERFORM_CREATE, performCreate);


}