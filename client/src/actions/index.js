import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  URL_ENTRY,
  API_KEY_ENTRY,
  FETCH_METRICS_SUCCESS,
  FETCH_METRICS_FAIL,
  FETCH_METRICS
} from "./actionTypes";
import { Actions } from "react-native-router-flux";
import * as firebase from "firebase";

//=============================================Authentication===========
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

//=============================================Authentication    End===========

export const apiEntry = text => {
  return {
    type: API_KEY_ENTRY,
    payload: text
  };
};

export const urlEntry = text => {
  return {
    type: URL_ENTRY,
    payload: text
  };
};

export const fetchMetrics = ({ apiKey, url }) => {
  return dispatch => {
    dispatch({ type: FETCH_METRICS });
    let api = apiKey;
    let grafurl = `http://${url}/api/datasources/proxy/1/api/v1/query_range?`;
    let startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
    let endTime = Math.floor(Date.now() / 1000);
    let step = 30;
    let queryCpu =
      'sum(rate(node_cpu{mode!="idle",mode!="iowait",mode!~"^(?:guest.*)$"}[5m])) BY (instance)';
    let urlValCpu = `${grafurl}query=${queryCpu}&start=${startTime}&end=${endTime}&step=${step}`;
    let queryMem =
      "1 - sum(node_memory_MemAvailable) by (node) / sum(node_memory_MemTotal) by (node)";
    let urlValMem = `${grafurl}query=${queryMem}&start=${startTime}&end=${endTime}&step=${step}`;

    let queryNetSat = "sum(rate(node_network_receive_bytes[5m])) by (node)";
    let urlValNetSat = `${grafurl}query=${queryNetSat}&start=${startTime}&end=${endTime}&step=${step}`;

    let queryNetSatTrans =
      "sum(rate(node_network_transmit_bytes[5m])) by (node)";
    let urlValNetSatTrans = `${grafurl}query=${queryNetSatTrans}&start=${startTime}&end=${endTime}&step=${step}`;
    let querySat =
      'sum(node_load1) by (node) / count(node_cpu{mode="system"}) by (node) * 100';
    let urlValSat = `${grafurl}query=${querySat}&start=${startTime}&end=${endTime}&step=${step}`;
    let dataFetch = [
      fetch(urlValCpu, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`
        }
      })
        .then(data => {
          return data.json();
        })
        .then(json => {
          let dataArray = [];
          let lastItem;
          json.data.result[0].values.forEach((val, i) => {
            lastItem = val[1];
            val = { x: val[0], y: Number(val[1] * 100000) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .catch(err => console.log(err)),

      fetch(urlValMem, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`
        }
      })
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

      fetch(urlValNetSat, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`
        }
      })
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

      fetch(urlValSat, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`
        }
      })
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
      fetch(urlValNetSatTrans, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`
        }
      })
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
        Actions.main();
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
