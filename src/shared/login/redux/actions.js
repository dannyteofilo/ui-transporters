import * as actions from '../../redux/constants';

export const starts = () => {
    return {
        type: actions.LOGIN_REQUEST_STARTS
    }
}

export const ends = () => {
    return {
        type: actions.LOGIN_REQUEST_ENDS
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

export const reset = () => {
    return {
        type: actions.LOGIN_RESET_STATE
    }
}