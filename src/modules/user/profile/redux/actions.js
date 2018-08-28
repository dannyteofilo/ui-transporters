import * as actions from 'shared/redux/constants';

export const starts = () => {
    return {
        type: actions.AVATAR_REQUEST_STARTS,
        payload: {
            requesting: true,
        }
    }
}

export const ends = () => {
    return {
        type: actions.AVATAR_REQUEST_ENDS,
        payload: {
            requesting: true,
        }
    }
}

export const fails = (error) => {
    return {
        type: actions.AVATAR_REQUEST_FAILED,
        payload: error
    }
}

export const success = (response) => {
    return {
        type: actions.AVATAR_REQUEST_SUCCESS,
        payload: response
    }
}

export const reset = () => {
    return {
        type: actions.AVATAR_RESET_STATE
    }
}
export const fetch=(payload)=>{
    return{
        type:actions.AVATAR_PERFORM_PROFILE,
        payload:payload
    }
}


