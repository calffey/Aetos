import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FETCH_METRICS_SUCCESS,
  FETCH_METRICS_FAIL,
  FETCH_METRICS,
  URL_ENTRY,
  API_KEY_ENTRY
} from "../actions/actionTypes";

const INTIAL_STATE = {
  email: "",
  password: "",
  api: "",
  url:"",
  user: null,
  error: "",
  signupError: "",
  loading: null,
  cpuUsage: null,
  memUsage: null,
  networkTraffic: null,
  saturation: null,
  isLoading: null,
  isLoggedIn: false
};

export default (state = INTIAL_STATE, action) => {

  switch (action.type) {

    case API_KEY_ENTRY:
     return {
       ...state,
       api: action.payload
     };
    case URL_ENTRY: 
      return {
        ...state,
        url: action.payload
      };
 
    default:
      return state;
  }
};
