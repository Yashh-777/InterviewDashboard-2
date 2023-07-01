import React, { Component } from "react";
import * as echarts from "echarts";

class PieChart extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.shortlisted !== prevProps.shortlisted ||
      this.props.rejected !== prevProps.rejected ||
      this.props.selected !== prevProps.selected
    ) {
      const chart = echarts.init(document.getElementById("pie-chart"));

      chart.setOption({
        title: {
          text: "",
        },
        tooltip: {},
        series: [
          {
            name: "Status",
            type: "pie",
            data: [
              {
                value: this.props.rejected,
                name: "Rejected",
                itemStyle: { color: "#fc0c00" },
              },
              {
                value: this.props.selected,
                name: "Selected",
                itemStyle: { color: "#32CD32" },
              },
              {
                value: this.props.shortlisted,
                name: "Shortlisted",
                itemStyle: { color: "#fafa2a" },
              },
            ],
          },
        ],
      });
    }
  }

  render() {
    return (
      <div>
        <div id="pie-chart" style={{ width: "100%", height: "500px" }}>
        </div>
      </div>
    );
  }
}

export default PieChart;
