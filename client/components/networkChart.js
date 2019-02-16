import React, { Component } from 'react';
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

export default class NetworkChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        return (
            <View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>Network Usage</Text>
                </View>
                <VictoryChart
                    responsive={true}
                    padding={{ top: 0, left: 70, right: 10, bottom: 30 }}
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
                        tickFormat={(x) => x + 'kb/s'}
                    />
                    <VictoryAxis
                        tickFormat={(x) => {
                            const date = new Date(x * 1000);
                            const hours = date.getHours();
                            const minutes = "0" + date.getMinutes();
                            const seconds = "0" + date.getSeconds();
                            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
                        tickFormat={(x) => {
                            const date = new Date(x * 1000);
                            const hours = date.getHours();
                            const minutes = "0" + date.getMinutes();
                            const seconds = "0" + date.getSeconds();
                            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
        alignSelf: 'stretch',
        paddingTop: 15,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderTopColor: '#076280',
        borderTopWidth: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 50
    },
    header: {
        alignSelf: 'flex-start',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#076280'
    },
});

const aetosLineTheme = {
    data: {
        stroke: '#076280',
        strokeWidth: 1
    },
    parent: {
        border: "1px solid #000"
    }
}

