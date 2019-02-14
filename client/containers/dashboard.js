import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryPolarAxis
} from "victory-native";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuUsage: null,
      memUsage: null,
      networkTraffic: null,
      nodeCount: null
    };
  }
  componentDidMount() {
    const dataFetch = [
      fetch("http://localhost:3477/cpuusage")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .then(objData => objData)
        .catch(err => console.log(err)),

      fetch("http://localhost:3477/memusage")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .then(objData => objData)
        .catch(err => console.log(err)),
      fetch("http://localhost:3477/networktraffic")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .then(objData => objData)
        .catch(err => console.log(err)),
      fetch("http://localhost:3477/nodecount")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .then(objData => {
          return objData;
        })
        .catch(err => console.log(err))
    ];

    Promise.all(dataFetch)
      .then(val => {
        console.log(val);
        this.setState({
          cpuUsage: val[0],
          memUsage: val[1],
          networkTraffic: val[2],
          nodeCount: val[3]
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.cpuUsage && (
          <VictoryChart style={styles.chart} theme={VictoryTheme.material}>
            <VictoryLine data={this.state.cpuUsage} />
          </VictoryChart>
        )}
      </View>
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
