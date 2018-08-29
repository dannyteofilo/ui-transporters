import list from '../components/list/redux/reducer';
import profile from '../components/create/redux/reducer';

// import image from '../profile/redux/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    list,
    profile,
    // image
})