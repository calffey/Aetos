import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./containers/LoginForm";
import DashBoard from "./containers/DashBoard";
import SignupForm from "./containers/SignupForm";
import { Icon } from "native-base";

const RouterComponent = () => {
  return (
    //adding individual scenes around component scenes will remove back button from rendered screens
    <Router>
      <Scene key="root">
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Login" initial />
          <Scene key="signup" component={SignupForm} title="Signup" />
        </Scene>

        <Scene key="main">
          <Scene key="dashboard" component={DashBoard} title="Dashboard" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
