import * as actions from 'shared/redux/constants';

export const starts = () => {
    return {
        type: actions.VEHICLE_UPDATE_REQUEST_STARTS,
        payload: {
            requesting: true,
        }
    }
}

export const ends = () => {
    return {
        type: actions.VEHICLE_UPDATE_REQUEST_ENDS,
        payload: {
            requesting: true,
        }
    }
}

export const fails = (error) => {
    return {
        type: actions.VEHICLE_UPDATE_REQUEST_FAILED,
        payload: error
    }
}

export const success = (response) => {
    return {
        type: actions.VEHICLE_UPDATE_REQUEST_SUCCESS,
        payload: response
    }
}


export const fetch = () => {
    return {
        type: actions.VEHICLE_UPDATE_PERFORM_FETCH,
    }
}

export const create= (data) =>{
    console.log('Data actions: ',data)
    return{
        type:actions.VEHICLE_PERFORM_CREATE,
        payload:data
    }
}


export const reset = () => {
    return {
        type: actions.VEHICLE_UPDATE_RESET_STATE
    }
}


export const resetError = () => {
    return {
        type: actions.VEHICLE_UPDATE_RESET_ERROR
    }
}
