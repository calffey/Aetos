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
} from "./actionTypes";
import { Actions } from "react-native-router-flux";
import * as firebase from "firebase";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const signupUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: SIGNUP_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => signinUserSuccess(dispatch, user))
      .catch(() => signupUserFail(dispatch));
  };
};

const signupUserFail = dispatch => {
  dispatch({ type: SIGNUP_USER_FAIL });
};

const signinUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

export const fetchMetrics = () => {
  return dispatch => {
    dispatch({ type: FETCH_METRICS });

    let dataFetch = [
      fetch("http://localhost:3477/cpuusage")
        .then(data => data.json())
        .then(json => {
          console.log("cpu");
          let dataArray = [];
          let lastItem;
          json.data.result[0].values.forEach((val, i) => {
            lastItem = val[1];
            val = { x: val[0], y: Number(val[1] * 100000) };
            dataArray.push(val);
          });
          console.log(lastItem);
          return dataArray;
        })
        .catch(err => console.log(err)),

      fetch("http://localhost:3477/memoryutilization")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .catch(err => console.log(err)),
      fetch("http://localhost:3477/networktraffic")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .catch(err => console.log(err)),
      fetch("http://localhost:3477/saturation")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .catch(err => console.log(err))
    ];

    Promise.all(dataFetch)
      .then(data => {
        fetchMetricsSuccess(dispatch, data);
      })
      .catch(() => fetchMetricsFail(dispatch));
  };
};

const fetchMetricsFail = dispatch => {
  dispatch({ type: FETCH_METRICS_FAIL });
};
const fetchMetricsSuccess = (dispatch, data) => {
  dispatch({
    type: FETCH_METRICS_SUCCESS,
    payload: data
  });
};
