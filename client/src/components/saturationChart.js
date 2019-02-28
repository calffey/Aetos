import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker } from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
import {
    VictoryLine,
    VictoryChart,
    VictoryAxis,
    VictoryZoomContainer,
    VictoryBrushContainer
} from "victory-native";

export default class SaturationChart extends Component {
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

    changeDropdown(value) {
        this.props.changeTime(value, 'saturation');
    }

    render() {
        const ddData = [
            { value: '6 hours' },
            { value: '12 hours' },
            { value: '1 day' },
            { value: '3 days' },
            { value: '7 days' },
        ];
        return (
            <View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.header}>Saturation</Text>
                    <Dropdown
                        label='Time'
                        data={ddData}
                        value={ddData[0].value}
                       // onChangeText={this.changeDropdown}
                        containerStyle={{ width: 100, position: "absolute", right: 0, top: -10 }}
                    />
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
                        tickFormat={(x) => x + '%'}
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
        paddingBottom: 15,
        marginBottom: 10,
        borderTopColor: '#ff8300',
        borderTopWidth: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 50,
        position: 'relative'
    },
    header: {
        alignSelf: 'flex-start',
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#ff8300'
    },
});

const aetosLineTheme = {
    data: {
        stroke: '#ff8300',
        strokeWidth: 1
    },
    parent: {
        border: "1px solid #000"
    }
}

