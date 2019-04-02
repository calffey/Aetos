import React from "react";
import { Scene, Router, Drawer, Overlay } from "react-native-router-flux";
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
          <Scene
            navigationBarStyle={{ backgroundColor: "#eeeeee" }}
            onLeft={() => "Aetos"}
            leftTitle="Aetos"
            onRight={() => "Login"}
            key="auth"
            component={LoginForm}
            rightTitle="Login"
            rightButtonTextStyle={{ color: "#000000" }}
            initial
          />
          <Scene
            navigationBarStyle={{ backgroundColor: "#eeeeee" }}
            key="signup"
            component={SignupForm}
            backTitle="Login"
            onRight={() => "Signup"}
            rightTitle="Signup"
            rightButtonTextStyle={{ color: "#000000" }}
          />

          <Drawer
            hideNavBar
            contentComponent={Menu}
            drawerPosition="left"
            drawerIcon={<Icon name="ios-menu" />}
            drawerWidth={300}
          >
            <Scene
              key="main"
              title="Aetos"
              component={DashBoard}
              rightTitle="Dashboard"
              titleStyle={{ color: "#00b2ed", fontSize: 30 }}
              rightButtonTextStyle={{ color: "#000000" }}
              onRight={() => "Dash"}
            />
            <Scene
              key="profile"
              component={Profile}
              rightButtonTextStyle={{ color: "#000000" }}
              onRight={() => "Dash"}
              rightTitle="Profile"
            />
          </Drawer>
        </Scene>
      </Overlay>
    </Router>
  );
};

export default RouterComponent;
