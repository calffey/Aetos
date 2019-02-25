import React, { Component } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import CpuUsageChart from "../components/cpuUsageChart";
import MemUsageChart from "../components/memUsageChart";
import NetworkChart from "../components/networkChart";
import SaturationChart from "../components/saturationChart";
import { Spinner } from "../containers/common";
import * as actions from "../actions";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetchMetrics();
  }

  _onRefresh = function () {
    this.setState({ refreshing: true });
    new Promise((resolve, reject) => {
      this.props.fetchMetrics();
      resolve();
    }).then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isLoading ? (
          <View style={[styles.indicatorContainer, styles.horizontal]}>
            <Spinner size="large" />
          </View>
        ) : (
            <ScrollView style={{ marginTop: 55 }}
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}>
              {Object.keys(this.props).map((dataType, i) => {
                if (dataType === "cpuUsage") {
                  return (
                    <View key={i}>
                      <CpuUsageChart data={this.props[dataType]} changeTime={this.props.changeTime} />
                    </View>
                  );
                } else if (dataType === "memUsage") {
                  return (
                    <View key={i}>
                      <MemUsageChart data={this.props[dataType]} changeDropdown={this.props.changeDropdown} />
                    </View>
                  );
                } else if (dataType === "networkTraffic") {
                  return (
                    <View key={i}>
                      <NetworkChart data={this.props[dataType]} changeDropdown={this.props.changeDropdown} />
                    </View>
                  );
                } else if (dataType === "saturation") {
                  return (
                    <View key={i}>
                      <SaturationChart data={this.props[dataType]} changeDropdown={this.props.changeDropdown} />
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

const mapDispatchToProps = (dispatch) => ({
  fetchMetrics: () => dispatch(actions.fetchMetrics()),
  changeTime: (value, graphName) => dispatch(actions.fetchGraph(value, graphName))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

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
