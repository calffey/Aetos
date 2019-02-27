import {

    FETCH_METRICS_SUCCESS,
    FETCH_METRICS_FAIL,
    FETCH_METRICS,

  } from "../actions/actionTypes";
  
  const INTIAL_STATE = {
    cpuUsage: null,
    memUsage: null,
    networkTraffic: null,
    saturation: null,
    isLoading: null,
    isLoggedIn: false
  };
  
  export default (state = INTIAL_STATE, action) => {

    switch (action.type) {
  
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
          isLoading: false,
          isLoggedIn: true
        };
      default:
        return state;
    }
  };
  