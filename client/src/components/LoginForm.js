import React, { Component } from "react";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
// import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

class LoginForm extends Component {
  // componentDidMount() {
  //   GoogleSignin.configure({
  //     scopes: ["https://apis.google.com/js/platform.js"], // what API you want to access on behalf of the user, default is email and profile
  //     iosClientId: ""
  //     // "239528451353-lncotgbbmu7v150iiio499sfrv80un7i.apps.googleusercontent.com" // client ID of type WEB for your server
  //   });
  // }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  isSignIn() {
    console.log("google");

    console.log("why");
  }

  isSigninInProgress() {
    return <Spinner size="large" />;
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "#ffffff" }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <View style={{ height: 50, marginBottom: 4 }}>
          <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        </View>
        <View style={{ height: 50 }}>
          <Button onPress={() => Actions.signup()}>Signup</Button>
        </View>

        {/* <GoogleSigninButton
          style={{
            height: 48
          }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.isSignIn()}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1, marginTop: 50 }}>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>
          {this.renderError()}
          <CardSection>
            <Input
              onChangeText={this.onPasswordChange.bind(this)}
              secureTextEntry
              label="Password"
              placeholder="password"
              value={this.props.password}
            />
          </CardSection>
          {this.renderButton()}
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(LoginForm);
