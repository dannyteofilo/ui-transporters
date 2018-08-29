import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import Vehicle from '../../../services/VehicleService'
import * as list from './actions';
import * as actions from 'shared/redux/constants';



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

function* performUpdate(action) {
    try {
        yield put(list.starts());

        const response = yield call(Vehicle.update,action.id,action.payload);        
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

        const response = yield call(Vehicle.delete,action.id);        
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

    yield takeLatest(actions.VEHICLE_CREATE_PERFORM_FETCH, performCreate);
    yield takeLatest(actions.VEHICLE_UPDATE_PERFORM_FETCH, performUpdate);
    yield takeLatest(actions.VEHICLE_DELETE_PERFORM_FETCH, performDelete);




}