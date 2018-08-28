import * as actions from 'shared/redux/constants';

export const starts = () => {
    return {
        type: actions.VEHICLE_REQUEST_STARTS,
        payload: {
            requesting: true,
        }
    }
}

export const ends = () => {
    return {
        type: actions.VEHICLE_REQUEST_ENDS,
        payload: {
            requesting: true,
        }
    }
}

export const fails = (error) => {
    return {
        type: actions.VEHICLE_REQUEST_FAILED,
        payload: error
    }
}

export const success = (response) => {
    return {
        type: actions.VEHICLE_REQUEST_SUCCESS,
        payload: response
    }
}


export const fetch = () => {
    return {
        type: actions.VEHICLE_PERFORM_FETCH,
    }
}


export const reset = () => {
    return {
        type: actions.VEHICLE_RESET_STATE
    }
}


export const resetError = () => {
    return {
        type: actions.VEHICLE_RESET_ERROR
    }
}
