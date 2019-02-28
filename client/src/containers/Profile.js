import React, { Component } from "react";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { fetchMetrics, apiEntry, urlEntry } from "../actions";
import { View, Text } from "react-native";
import { Actions } from "react-native-router-flux";

class LoginForm extends Component {
  onAPIChange(text) {
    this.props.apiEntry(text);
  }

  onUrlChange(text) {
    this.props.urlEntry(text);
  }

  onButtonPress() {
    const { apiKey, url } = this.props;

    this.props.fetchMetrics({ apiKey, url });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <View>
        <View style={{ height: 50, marginBottom: 4 }}>
          <Button onPress={this.onButtonPress.bind(this)}>Save</Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
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

          <CardSection>
            <Input
              onChangeText={this.onAPIChange.bind(this)}
              secureTextEntry
              label="API Key"
              placeholder="API Key"
              value={this.props.apiKey}
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

const mapStateToProps = ({ api }) => {
  const { loading, apiKey, url } = api;

  return { loading, apiKey, url };
};

export default connect(
  mapStateToProps,
  { apiEntry, urlEntry, fetchMetrics }
)(LoginForm);
