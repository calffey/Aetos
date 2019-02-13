import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import LoginScreen from './containers/login';
import DashboardScreen from './containers/dashboard';
import AlertsScreen from './containers/alerts';
import CPanelScreen from './containers/cpanel';

class App extends Component {
  render() {
    return (
      <LoginScreen navigation={this.props.navigation} />
    );
  }
}


const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardScreen },
  CPanel: { screen: CPanelScreen },
  Alerts: { screen: AlertsScreen }
});

const AppSwitchNavigator = createSwitchNavigator({
  App: { screen: App },
  DrawerNav: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
