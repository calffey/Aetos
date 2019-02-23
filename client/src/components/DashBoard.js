import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import CpuUsageChart from "../../components/cpuUsageChart";
import MemUsageChart from "../../components/memUsageChart";
import NetworkChart from "../../components/networkChart";
import SaturationChart from "../../components/saturationChart";
import { Spinner } from "./common";
import { fetchMetrics } from "../actions";

class DashBoard extends Component {
  componentDidMount() {
    this.props.fetchMetrics();
  }
  render() {
    console.log(this.props, "dasssssshhshhshshyyyy");
    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          <View style={[styles.indicatorContainer, styles.horizontal]}>
            <Spinner size="large" />
          </View>
        ) : (
          <ScrollView>
            {Object.keys(this.props).map((dataType, i) => {
              if (dataType === "cpuUsage") {
                return (
                  <View key={i}>
                    <CpuUsageChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === "memUsage") {
                return (
                  <View key={i}>
                    <MemUsageChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === "networkTraffic") {
                return (
                  <View key={i}>
                    <NetworkChart data={this.props[dataType]} />
                  </View>
                );
              } else if (dataType === "saturation") {
                return (
                  <View key={i}>
                    <SaturationChart data={this.props[dataType]} />
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

const mapStateToProps = ({ auth }) => {
  const { isLoading, cpuUsage, memUsage, networkTraffic, saturation } = auth;

  return { isLoading, cpuUsage, memUsage, networkTraffic, saturation };
};

export default connect(
  mapStateToProps,
  { fetchMetrics }
)(DashBoard);

const styles = {
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
};
