import React, { Component } from "react";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import Router from "./Router";
import { store, persistor } from "./configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "../src/containers/common";

class App extends Component {
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



// import React, { Component } from "react";
// import * as firebase from "firebase";
// import { Provider } from "react-redux";
// import Router from "./Router";
// //import { store, persistor } from "./configureStore";
// import { PersistGate } from "redux-persist/integration/react";
// import { Spinner, Card } from "../src/containers/common";
// import { createStore, applyMiddleware } from "redux";
// import reducers from "./reducers";
// import ReduxThunk from "redux-thunk";

// class App extends Component {
//  renderLoading() {
//    return (
//      <Card>
//        <Spinner size="large" />
//      </Card>
//    );
//  }

//  render() {
//    let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
//    return (
//      <Provider store={store}>
//        <Router />
//      </Provider>
//    );
//  }
// }

// export default App;