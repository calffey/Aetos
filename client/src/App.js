import React, { Component } from "react";
import { Provider } from "react-redux";
import Router from "./Router";
import { store, persistor } from "./configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "../src/containers/common";
import * as firebase from "firebase";
import { View, Text } from "react-native";

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
    return (
      <View>
        <Text testID="welcome">Welcome</Text>
      </View>
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={this.renderLoading()} persistor={persistor}>
          <Router testID="nav" />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
