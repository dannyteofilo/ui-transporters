import list from '../components/list/redux/reducer';
import create from '../components/create/redux/reducer';
import update from '../components/update/redux/reducer'

// import image from '../profile/redux/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    list,
    create,
    update
    // image
})