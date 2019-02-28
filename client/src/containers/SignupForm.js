import React, { Component } from "react";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, signupUser } from "../actions";
import { View, Text } from "react-native";

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.signupUser({ email, password });
  }

  renderError() {
    if (this.props.signupError) {
      return (
        <View style={{ backgroundColor: "#ffffff" }}>
          <Text style={styles.errorTextStyle}>{this.props.signupError}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
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
          <CardSection>{this.renderButton()}</CardSection>
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
  const { email, password, signupError, loading } = auth;

  return { email, password, signupError, loading };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, signupUser }
)(SignupForm);
