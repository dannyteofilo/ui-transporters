import { combineReducers } from 'redux'
import loginReducer from 'modules/user/redux/reducer'
import vehicleReducer from 'modules/vehicles/redux/reducer'
import travelReducer from 'modules/travels/redux/reducer'

const reducer =combineReducers({
    login: loginReducer,
    vehicles:vehicleReducer,
    travels:travelReducer
})

export default reducer