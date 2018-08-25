import {fork,all} from 'redux-saga/effects' 

import login from './../login/redux/saga'

export default function * rootSaga(){
    yield all([
        fork(login)
    ])
}