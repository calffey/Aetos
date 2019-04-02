import React, { Component } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryZoomContainer,
  VictoryBrushContainer
} from "victory-native";

export default class CpuUsageChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeDropdown = this.changeDropdown.bind(this);
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  changeDropdown(value) {
    this.props.changeTime(value, "cpu");
  }

  render() {
    const ddData = [
      { value: "6 hours" },
      { value: "12 hours" },
      { value: "1 day" },
      { value: "3 days" },
      { value: "7 days" }
    ];

    return (
      <View>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>CPU Usage</Text>
          <Dropdown
            label="Time"
            data={ddData}
            value={ddData[0].value}
            //onChangeText={this.changeDropdown}
            containerStyle={{
              width: 100,
              position: "absolute",
              right: 0,
              top: -10
            }}
          />
        </View>
        <VictoryChart
          responsive={true}
          padding={{ top: 0, left: 50, right: 10, bottom: 30 }}
          height={250}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            dependentAxis
            tickFormat={x => {
              return (x / 1000).toFixed(1) + "%";
            }}
          />
          <VictoryAxis
            tickFormat={x => {
              const date = new Date(x * 1000);
              const hours = date.getHours();
              const minutes = "0" + date.getMinutes();
              const seconds = "0" + date.getSeconds();
              return (
                hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
              );
            }}
          />
          <VictoryLine style={aetosLineTheme} data={this.props.data} />
        </VictoryChart>
        <VictoryChart
          responsive={true}
          padding={{ top: 0, left: 10, right: 10, bottom: 30 }}
          height={90}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >
          <VictoryAxis
            tickFormat={x => {
              const date = new Date(x * 1000);
              const hours = date.getHours();
              const minutes = "0" + date.getMinutes();
              const seconds = "0" + date.getSeconds();
              return (
                hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2)
              );
            }}
          />
          <VictoryLine style={aetosLineTheme} data={this.props.data} />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignSelf: "stretch",
    paddingTop: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 15,
    marginBottom: 10,
    borderTopColor: "#00b2ed",
    borderTopWidth: 5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginTop: 10,
    position: "relative"
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#00b2ed"
  }
});

const aetosLineTheme = {
  data: {
    stroke: "#00b2ed",
    strokeWidth: 1
  },
  parent: {
    border: "1px solid #000"
  }
};
