import * as actions from "shared/redux/constants";

const initialState = {
  requesting: false,
  error: null,
  response: null,
  success:null
};

const reducer = (state = initialState, action) => {
  let newState = null;

  switch (action.type) {
    case actions.TRAVELS_REQUEST_STARTS:
      newState = {
        ...state,
        requesting: true
      };
      break;

    case actions.TRAVELS_REQUEST_SUCCESS:
      newState = {
        ...state,
        ...action.payload,
        success:true
      };
      break;

    case actions.TRAVELS_REQUEST_FAILED:
      newState = {
        ...state,
        ...action.payload,
        success:false
      };
      break;

    case actions.TRAVELS_REQUEST_ENDS:
      newState = {
        ...state,
        requesting: false,
        success:false
      };
      break;


    case actions.TRAVELS_RESET_STATE:
      newState = { ...initialState };
      break;

    case actions.TRAVELS_RESET_ERROR:
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
