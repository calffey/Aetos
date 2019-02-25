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
  FETCH_METRICS
} from "../actions/actionTypes";

const INTIAL_STATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  signupError: "",
  loading: false,
  cpuUsage: null,
  memUsage: null,
  networkTraffic: null,
  saturation: null,
  isLoading: true
};

export default function authReducer(state = INTIAL_STATE, action){
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
      };

    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        email: "",
        password: ""
      };

    case SIGNUP_USER:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case SIGNUP_USER_FAIL:
      return {
        ...state,
        signupError: "password must be at least 6 characters",
        loading: false
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        email: "",
        password: ""
      };

    case LOGIN_USER_FAIL:
      return { ...state, error: "Authentication Failed.", loading: false };

    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: ""
      };

    case FETCH_METRICS_FAIL:
      return { ...state, isLoading: true };

    case FETCH_METRICS:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_METRICS_SUCCESS:
      return {
        ...state,
        cpuUsage: action.payload[0],
        memUsage: action.payload[1],
        networkTraffic: action.payload[2],
        saturation: action.payload[3],
        isLoading: false
      };

    default:
      return state;
  }
};
