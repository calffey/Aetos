import React, { Component } from "react";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser, fetchMetrics,apiEntry,urlEntry } from "../actions";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";
// import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

class LoginForm extends Component {
  componentDidMount() {
    // GoogleSignin.configure({
    //   scopes: ["https://apis.google.com/js/platform.js"], // what API you want to access on behalf of the user, default is email and profile
    //   iosClientId: ""
    //   // "239528451353-lncotgbbmu7v150iiio499sfrv80un7i.apps.googleusercontent.com" // client ID of type WEB for your server
    // });
  }
  // onEmailChange(text) {
  //   this.props.emailChanged(text);
  // }

  // onPasswordChange(text) {
  //   this.props.passwordChanged(text);
  // }

  onAPIChange(text) {
    this.props.apiEntry(text)
  }

  onUrlChange(text) {
    this.props.urlEntry(text)
  }

  onButtonPress() {
    const { api, url } = this.props;

    this.props.fetchMetrics({api, url});
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
        <CardSection>
        <Input style={{ height: 90 }} value={'eyJrIjoiYmFnUmh5STVRM0xZTnljcDB4aGJ5akpsanRsa0M3RWMiLCJuIjoiYWRnZW5rZXkiLCJpZCI6MX0='} />
        </CardSection>
        <CardSection>
        <Input style={{ height: 90 }} value={'http://35.232.120.147/api/datasources/proxy/1/api/v1/query_range?'} />
        </CardSection>
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1, marginTop: 50 }}>
        <Card>
          <CardSection>
            <Input
              label="Grafana Url"
              secureTextEntry
              placeholder="Grafana Url"
              onChangeText={this.onUrlChange.bind(this)}
              value={this.props.url}
            />
  
          </CardSection>
          {this.renderError()}
          <CardSection>
            <Input
              onChangeText={this.onAPIChange.bind(this)}
              secureTextEntry
              label="API Key"
              placeholder="API Key"
              value={this.props.api}
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
  const { email, password, error, loading,api,url } = auth;

  return { email, password, error, loading,api,url };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged,apiEntry,urlEntry, loginUser, fetchMetrics }
)(LoginForm);
