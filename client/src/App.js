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
      apiKey: "ENTER API KEY",
      authDomain: "ENTER AUTH DOMAIN",
      databaseURL: "ENTER DATABASE URL",
      projectId: "ENTER PROJECT ID",
      storageBucket: "ENTER STORAGE BUCKETT",
      messagingSenderId: "ENTER MESSAGING SENDER ID"
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
