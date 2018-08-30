import { combineReducers } from 'redux'
import loginReducer from 'modules/user/redux/reducer'
import vehicleReducer from 'modules/vehicles/redux/reducer'
import travelReducer from 'modules/travels/redux/reducer'
import driverReducer from 'modules/drivers/redux/reducer'

const reducer =combineReducers({
    login: loginReducer,
    vehicles:vehicleReducer,
    travels:travelReducer,
    drivers:driverReducer
})

export default reducer