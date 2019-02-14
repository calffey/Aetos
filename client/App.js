import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Icon } from "native-base";

import LoginScreen from "./containers/login";
import DashboardScreen from "./containers/dashboard";
import AlertsScreen from "./containers/alerts";
import CPanelScreen from "./containers/cpanel";

class App extends Component {
  render() {
    return <LoginScreen navigation={this.props.navigation} />;
  }
}

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: navigation.state.routeName,
        headerLeft: (
          <Icon
            name="md-menu"
            style={{ paddingLeft: 10 }}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});
const CPanelStack = createStackNavigator({
  CPanel: {
    screen: CPanelScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: navigation.state.routeName,
        headerLeft: (
          <Icon
            name="md-menu"
            style={{ paddingLeft: 10 }}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});
const AlertsStack = createStackNavigator({
  Alerts: {
    screen: AlertsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: navigation.state.routeName,
        headerLeft: (
          <Icon
            name="md-menu"
            style={{ paddingLeft: 10 }}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        )
      };
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStack },
  CPanel: { screen: CPanelStack },
  Alerts: { screen: AlertsStack }
});

const AppSwitchNavigator = createSwitchNavigator({
  App: { screen: App },
  DrawerNav: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
