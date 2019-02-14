import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Switch
} from "native-base";

export default class CPanelScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchOn1: false,
      switchOn2: false,
      switchOn3: false
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="ios-egg" />
              </Button>
            </Left>
            <Body>
              <Text>Pods</Text>
            </Body>
            <Right>
              <Switch
                value={this.state.switchOn1}
                onValueChange={value => this.setState({ switchOn1: value })}
              />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <Icon active name="ios-git-network" />
              </Button>
            </Left>
            <Body>
              <Text>Nodes</Text>
            </Body>
            <Right>
              <Switch
                value={this.state.switchOn2}
                onValueChange={value => this.setState({ switchOn2: value })}
              />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="ios-cube" />
              </Button>
            </Left>
            <Body>
              <Text>Services</Text>
            </Body>
            <Right>
              <Switch
                value={this.state.switchOn3}
                onValueChange={value => this.setState({ switchOn3: value })}
              />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
