import React, { Component } from "react";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import Router from "./Router";
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  // componentWillMount() {
  //   const config = {apiKey: "AIzaSyAH-_0tusXB2WmLNgnpYT9CRkNLi8fH5VI",
  //   authDomain: "authentication-7993c.firebaseapp.com",
  //   databaseURL: "https://authentication-7993c.firebaseio.com",
  //   projectId: "authentication-7993c",
  //   storageBucket: "authentication-7993c.appspot.com",
  //   messagingSenderId: "756485903649"};

  //   firebase.initializeApp(config);
  // }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
