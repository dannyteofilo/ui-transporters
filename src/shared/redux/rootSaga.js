import {fork,all} from 'redux-saga/effects' 

import login from './../login/redux/saga'
import listVehicle from './../../modules/vehicles/components/list/redux/saga'
import createVehicle from './../../modules/vehicles/components/create/redux/saga'
import listTravel from './../../modules/travels/components/list/redux/saga'
import createTravel from './../../modules/travels/components/create/redux/saga'
import ListDriver from './../../modules/drivers/components/list/redux/saga'
import createDriver from './../../modules/drivers/components/create/redux/saga'
import stats from './../../modules/home/redux/saga';
// import avatar from './../../modules/user/profile/redux/saga'

export default function * rootSaga(){
    yield all([
        fork(login),
        fork(listVehicle),
        fork(createVehicle),
        fork(listTravel),
        fork(createTravel),
        fork(ListDriver),
        fork(createDriver),
        fork(stats)
        // fork(avatar)
    ])
}