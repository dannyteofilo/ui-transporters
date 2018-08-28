import { combineReducers } from 'redux'
import loginReducer from 'modules/user/redux/reducer'
import vehicleReducer from 'modules/vehicles/redux/reducer'

const reducer =combineReducers({
    login: loginReducer,
    vehicles:vehicleReducer
})

export default reducer