import React, { Component } from "react";
import { Provider } from "react-redux";
import Router from "./Router";
import { store, persistor } from "./configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "../src/containers/common";
import * as firebase from "firebase";

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAH-_0tusXB2WmLNgnpYT9CRkNLi8fH5VI",
      authDomain: "authentication-7993c.firebaseapp.com",
      databaseURL: "https://authentication-7993c.firebaseio.com",
      projectId: "authentication-7993c",
      storageBucket: "authentication-7993c.appspot.com",
      messagingSenderId: "756485903649"
    };

    firebase.initializeApp(config);
  }
  renderLoading() {
    return <Spinner size="large" />;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
