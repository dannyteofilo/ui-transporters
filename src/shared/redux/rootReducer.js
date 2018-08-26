import { combineReducers } from 'redux'
import loginReducer from 'modules/user/redux/reducer'

const reducer =combineReducers({
    login: loginReducer
})

export default reducer