import React from "react";
import {
  Scene,
  Router,
  Drawer,
  Actions,
  Overlay
} from "react-native-router-flux";
import LoginForm from "./containers/LoginForm";
import DashBoard from "./containers/DashBoard";
import SignupForm from "./containers/SignupForm";
import Profile from "./containers/Profile";
import { Icon } from "native-base";
import Menu from "./containers/Menu";

const RouterComponent = () => {
  return (
    //adding individual scenes around component scenes will remove back button from rendered screens
    <Router>
      <Overlay key="overlay">
        <Scene key="root">
          <Scene key="auth" component={LoginForm} title="Login" initial />
          <Scene key="signup" component={SignupForm} title="Signup" />

          <Drawer
            hideNavBar
            contentComponent={Menu}
            drawerPosition="left"
            drawerIcon={<Icon name="ios-menu" />}
            drawerWidth={300}
          >
            <Scene key="main" title="Aetos" component={DashBoard} />
            <Scene key="profile" title="Profile" component={Profile} />
          </Drawer>
        </Scene>
      </Overlay>
    </Router>
  );
};

export default RouterComponent;
