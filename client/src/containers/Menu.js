import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Content, List, ListItem } from "native-base";

export default class Menu extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "cover",
              position: "absolute",
              justifyContent: "center"
            }}
            source={require("./side-nav-bird.png")}
          />
        </View>
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
