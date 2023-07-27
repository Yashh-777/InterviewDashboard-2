import React, { Component } from 'react';
import * as echarts from 'echarts';

class ClickableColumnChart extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.shortlisted !== prevProps.shortlisted ||
      this.props.rejected !== prevProps.rejected ||
      this.props.selected !== prevProps.selected
    ) {
      const chart = echarts.init(document.getElementById('chart'));

      // Set the chart options
      chart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Rejected', 'Shortlisted', 'Selected']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Status',
          type: 'bar',
          data: [
            { value: this.props.rejected, name: 'Rejected', itemStyle: { color: '#fc0c00' } },
            { value: this.props.shortlisted, name: 'Shortlisted', itemStyle: { color: '#fafa2a' } },
            { value: this.props.selected, name: 'Selected', itemStyle: { color: '#32CD32' } },
          ],
          // Add a click event handler for the columns
          emphasis: {
            itemStyle: {
              color: '#c23531'
            }
          },
          onclick: () => {
            // Log the name of the clicked column to the console
            console.log(params.name);
          }
        }]
      });
    }
  }

  render() {
    return (
      <div>
        <div id="chart" style={{ width: '75%', height: '240px' }}></div>
      </div>
    );
  }
}

export default ClickableColumnChart;
