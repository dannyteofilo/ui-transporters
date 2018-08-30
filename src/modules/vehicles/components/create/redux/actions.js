import * as actions from 'shared/redux/constants';

export const starts = () => {
    return {
        type: actions.VEHICLE_CREATE_REQUEST_STARTS,
        payload: {
            requesting: true,
        }
    }
}

export const ends = () => {
    return {
        type: actions.VEHICLE_CREATE_REQUEST_ENDS,
        payload: {
            requesting: true,
        }
    }
}

export const fails = (error) => {
    return {
        type: actions.VEHICLE_CREATE_REQUEST_FAILED,
        payload: error
    }
}

export const success = (response) => {
    return {
        type: actions.VEHICLE_CREATE_REQUEST_SUCCESS,
        payload: response
    }
}


export const fetch = (data) => {
    return {
        type: actions.VEHICLE_CREATE_PERFORM_FETCH,
        payload:data
    }
}

export const fetchUpdate=(id, data)=>{
    return{
        type:actions.VEHICLE_UPDATE_PERFORM_FETCH,
        id:id,
        payload:data
    }
}

export const fetchDelete=(id)=>{
    return{
        type:actions.VEHICLE_DELETE_PERFORM_FETCH,
        id:id
    }
}

export const reset = () => {
    return {
        type: actions.VEHICLE_CREATE_RESET_STATE
    }
}


export const resetError = () => {
    return {
        type: actions.VEHICLE_CREATE_RESET_ERROR
    }
}
