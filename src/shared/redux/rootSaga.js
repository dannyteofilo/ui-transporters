import {fork,all} from 'redux-saga/effects' 

import login from './../login/redux/saga'
// import avatar from './../../modules/user/profile/redux/saga'

export default function * rootSaga(){
    yield all([
        fork(login),
        // fork(avatar)
    ])
}