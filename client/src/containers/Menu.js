import React, { Component } from "react";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { Content, List, ListItem } from "native-base";

export default class Menu extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#2c3e50",
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <View style={{ flex: 2 }}>
          <Content>
            <ListItem onPress={() => Actions.main()}>
              <Text>Dashboard</Text>
            </ListItem>
            <ListItem onPress={() => Actions.profile()}>
              <Text>Profile</Text>
            </ListItem>
          </Content>
        </View>
      </View>
    );
  }
}
