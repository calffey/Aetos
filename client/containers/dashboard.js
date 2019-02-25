import React, { Component } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import CpuUsageChart from "../components/cpuUsageChart";
import MemUsageChart from "../components/memUsageChart";
import NetworkChart from "../components/networkChart";
import SaturationChart from "../components/saturationChart";

export default class DashboardScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       cpuUsage: null,
//       memUsage: null,
//       networkTraffic: null,
//       nodeCount: null,
//       isLoading: true
//     };

//     this.getData = this.getData.bind(this);
//   }

//   getData() {
//     let dataFetch = [
//       fetch("http://localhost:3477/cpuusage")
//         .then(data => data.json())
//         .then(json => {
//           console.log("cpu");
//           let dataArray = [];
//           let lastItem;
//           json.data.result[0].values.forEach((val, i) => {
//             lastItem = val[1];
//             val = { x: val[0], y: Number(val[1] * 100000) };
//             dataArray.push(val);
//           });
//           console.log(lastItem);
//           return dataArray;
//         })
//         .catch(err => console.log(err)),
// =======

    constructor(props) {
        super(props);
        this.state = {
            cpuUsage: null,
            memUsage: null,
            networkTraffic: null,
            nodeCount: null,
            isLoading: true
        };

        this.getData = this.getData.bind(this);
        this.updateGraph = this.updateGraph.bind(this);
    }

    getData(...typeID) {
        let dataFetch = [
            fetch("http://localhost:3477/cpuusage")
                .then(data => data.json())
                .then(json => {
                    console.log('cpu');
                    let dataArray = [];
                    let lastItem;
                    json.data.result[0].values.forEach((val, i) => {
                        lastItem = val[1];
                        val = { x: val[0], y: Number(val[1] * 100000) };
                        dataArray.push(val);
                    });
                    return dataArray;
                })
                .catch(err => console.log(err)),

            fetch("http://localhost:3477/memoryutilization")
                .then(data => data.json())
                .then(json => {
                    let dataArray = [];
                    json.data.result[0].values.forEach(val => {
                        val = { x: val[0], y: Number(val[1]) };
                        dataArray.push(val);
                    });
                    return dataArray;
                })
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
                .catch(err => console.log(err)),
            fetch("http://localhost:3477/saturation")
                .then(data => data.json())
                .then(json => {
                    let dataArray = [];
                    json.data.result[0].values.forEach(val => {
                        val = { x: val[0], y: Number(val[1]) };
                        dataArray.push(val);
                    });
                    return dataArray;
                })
                .catch(err => console.log(err))
        ];
        console.log(typeID);
        Promise.all(typeID.length ? [dataFetch[typeID[0]]] : dataFetch)
            .then(val => {
                const graphArr = ['cpuUsage', 'memUsage', 'networkTraffic', 'saturation'];

                this.setState((prevState) => {
                    const newState = {};
                    val.forEach((v, i) => {
                        newState[graphArr[typeID.length ? typeID[0] : i]] = v;
                    });
                    return { ...prevState, ...newState, isLoading: false }
                })
            })
            .catch(err => console.log(err))
    }

    updateGraph() {
        console.log('hit update');
        this.getData(0);
    }

    componentDidMount() {
        console.log('hit');
        this.getData();
    }


      fetch("http://localhost:3477/memoryutilization")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
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
        .catch(err => console.log(err)),
      fetch("http://localhost:3477/saturation")
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = { x: val[0], y: Number(val[1]) };
            dataArray.push(val);
          });
          return dataArray;
        })
        .catch(err => console.log(err))
    ];

    Promise.all(dataFetch)
      .then(val => {
        this.setState({
          cpuUsage: val[0],
          memUsage: val[1],
          networkTraffic: val[2],
          saturation: val[3],
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  }


  componentDidMount() {
    this.interval = setInterval(this.getData, 15000);
  }
// =======
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ? (
                    <View style={[styles.indicatorContainer, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                        <ScrollView>
                            {Object.keys(this.state).map((dataType, i) => {
                                if (dataType === 'cpuUsage') {
                                    return (
                                        <View key={i}>
                                            <CpuUsageChart
                                                data={this.state[dataType]}
                                                updateGraph={this.updateGraph}
                                            />
                                        </View>
                                    )
                                } else if (dataType === 'memUsage') {
                                    return (
                                        <View key={i}>
                                            <MemUsageChart
                                                data={this.state[dataType]}
                                                updateGraph={this.updateGraph}
                                            />
                                        </View>
                                    )
                                } else if (dataType === 'networkTraffic') {
                                    return (
                                        <View key={i}>
                                            <NetworkChart
                                                data={this.state[dataType]}
                                                updateGraph={this.updateGraph}
                                            />
                                        </View>
                                    )
                                } else if (dataType === 'saturation') {
                                    return (
                                        <View key={i}>
                                            <SaturationChart
                                                data={this.state[dataType]}
                                                updateGraph={this.updateGraph}
                                            />
                                        </View>
                                    )
                                }
                            })}
                        </ScrollView>


  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={[styles.indicatorContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView>
            {Object.keys(this.state).map((dataType, i) => {
              if (dataType === "cpuUsage") {
                return (
                  <View key={i}>
                    <CpuUsageChart data={this.state[dataType]} />
                  </View>
                );
              } else if (dataType === "memUsage") {
                return (
                  <View key={i}>
                    <MemUsageChart data={this.state[dataType]} />
                  </View>
                );
              } else if (dataType === "networkTraffic") {
                return (
                  <View key={i}>
                    <NetworkChart data={this.state[dataType]} />
                  </View>
                );
              } else if (dataType === "saturation") {
                return (
                  <View key={i}>
                    <SaturationChart data={this.state[dataType]} />
                  </View>
                );
              }
            })}
          </ScrollView>
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
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  },
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0
  }
});
