import * as actions from '../../redux/constants';

export const starts = () => {
    return {
        type: actions.LOGIN_REQUEST_STARTS,
        payload: {
            requesting: true,
        }
    }
}

export const ends = () => {
    return {
        type: actions.LOGIN_REQUEST_ENDS,
        payload: {
            requesting: true,
        }
    }
}

export const fails = (error) => {
    return {
        type: actions.LOGIN_REQUEST_FAILED,
        payload: error
    }
}

export const success = (response) => {
    return {
        type: actions.LOGIN_REQUEST_SUCCESS,
        payload: response
    }
}

export const logout = () => {
    return {
        type: actions.LOGIN_LOGOUT
    }
}

export const fetch = (payload) => {
    return {
        type: actions.LOGIN_PERFORM_LOGIN,
        payload: payload
    }
}

export const fetchRegister = (payload) => {
    return {
        type: actions.LOGIN_PERFORM_REGISTER,
        payload: payload
    }
}

export const fetchUpdate = (id,payload) => {
    return {
        type: actions.LOGIN_PERFORM_UPDATE,
        id:id,
        payload: payload
    }
}

export const fetchUpdateWithImage=(id,payload,file)=>{
        return{
        type: actions.LOGIN_PERFORM_UPDATE_WITH_IMAGE,
        id:id,
        payload: payload,
        file:file
        }
}

export const reset = () => {
    return {
        type: actions.LOGIN_RESET_STATE
    }
}


export const resetError = () => {
    return {
        type: actions.LOGIN_RESET_ERROR
    }
}
