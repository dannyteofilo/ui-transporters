import {fork,all} from 'redux-saga/effects' 

import login from './../login/redux/saga'
import listVehicle from './../../modules/vehicles/components/list/redux/saga'
import updateVehicle from './../../modules/vehicles/components/update/redux/saga'
// import avatar from './../../modules/user/profile/redux/saga'

export default function * rootSaga(){
    yield all([
        fork(login),
        fork(listVehicle),
        fork(updateVehicle)
        // fork(avatar)
    ])
}