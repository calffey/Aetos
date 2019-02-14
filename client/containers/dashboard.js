import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryBar,
    VictoryAxis,
    Data,
    VictoryZoomContainer,
    VictoryBrushContainer
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
                    json.data.result[0].values.forEach((val, i) => {
                        val = { x: val[0], y: Number(val[1]) };
                        dataArray.push(val);
                    });
                    return dataArray;
                })
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

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        return (
            <View style={styles.container}>
                <VictoryChart
                    containerComponent={
                        <VictoryZoomContainer
                            zoomDimension="x"
                            zoomDomain={this.state.zoomDomain}
                            onZoomDomainChange={this.handleZoom.bind(this)}
                        />
                    }
                >
                    <VictoryAxis dependentAxis />
                    <VictoryAxis
                        tickFormat={(x) => {
                            const date = new Date(x * 1000);
                            const hours = date.getHours();
                            const minutes = "0" + date.getMinutes();
                            const seconds = "0" + date.getSeconds();
                            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        }}
                    />
                    <VictoryLine style={aetosLineTheme} data={this.state.cpuUsage} />
                </VictoryChart>
                <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
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
                        tickFormat={(x) => {
                            const date = new Date(x * 1000);
                            const hours = date.getHours();
                            const minutes = "0" + date.getMinutes();
                            const seconds = "0" + date.getSeconds();
                            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                        }}
                    />
                    <VictoryLine style={aetosLineTheme} data={this.state.cpuUsage} />

                </VictoryChart>
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
    }
});

const aetosLineTheme = {
    data: {
        stroke: 'tomato',
        strokeWidth: 1
    },
    parent: {
        border: "1px solid blue"
    }
}