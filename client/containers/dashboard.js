import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        fetch('http://localhost:3477/data')
            .then(data => data.json())
            .then(json => this.setState({ data: json }));

    }
    render() {
        // let lineData = [{ x: 1, y: 5 }, { x: 2, y: 3 }];
        // if (Array.isArray(this.state.data)) {
        //     lineData = this.state.data;
        // }
        return (
            <View style={styles.container}>
                {this.state.data &&
                    <VictoryChart style={styles.chart} theme={VictoryTheme.material}>
                        <VictoryLine style={{ data: { stroke: "#c43a31" }, parent: { border: "1px solid #ccc" } }}
                            data={this.state.data} x='time' y='pods' />
                    </VictoryChart>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});