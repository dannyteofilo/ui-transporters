import * as actions from "../../redux/constants";

const initialState = {
  requesting: false,
  error: null,
  response: null,
  success:null
};

const reducer = (state = initialState, action) => {
  let newState = null;

  switch (action.type) {
    case actions.LOGIN_REQUEST_STARTS:
      newState = {
        ...state,
        requesting: true
      };
      break;

    case actions.LOGIN_REQUEST_SUCCESS:
      newState = {
        ...state,
        ...action.payload,
        success:true
      };
      break;

    case actions.LOGIN_REQUEST_FAILED:
      newState = {
        ...state,
        ...action.payload,
        success:false
      };
      break;

    case actions.LOGIN_REQUEST_ENDS:
      newState = {
        ...state,
        requesting: false,
        success:false
      };
      break;

    case actions.LOGIN_LOGOUT:

    case actions.LOGIN_RESET_STATE:
      newState = { ...initialState };
      break;

    case actions.LOGIN_RESET_ERROR:
      newState = {
        ...state,
        error:null,
        success:null
      };
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

export default reducer;
