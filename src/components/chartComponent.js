/********************************** 
 * 
 * for more references: https://dzone.com/articles/integration-of-highcharts-with-react-javascript-li
 * http://kirjs.github.io/react-highcharts/
 * https://scriptverse.academy/tutorials/reactjs-highcharts.html
 * 
***********************************/
import React, {Component} from 'react';
// eslint-disable-next-line
import {Bar, Line, Pie} from 'react-chartjs-2';
import Highcharts from 'highcharts';

class ChartComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeData : '',
            series: [{
                name: 'Gases',
                data: [
                  {
                    name: 'Argon',
                    y: 0.9,
                    color: '#3498db'
                  },
                  {
                    name: 'Nitrogen',
                    y: 78.1,
                    color: '#9b59b6'
                  },
                  {
                    name: 'Oxygen',
                    y: 20.9,
                    color: '#2ecc71'
                  },
                  {
                    name: 'Trace Gases',
                    y: 0.1,
                    color: '#f1c40f'
                  }
                ]
              }],

            chartData : {
                labels : ['New Delhi', 'Chandigarh', 'Gurgaon', 'Mumbai', 'Hyedarabad', 'Banglore'],
                datasets : [
                    {
                        label: 'Devices',
                        data: [
                            789,
                            721,
                            1191,
                            934,
                            1215,
                            765
                        ],
                        //backgroundColor : 'Gray',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 165, 122, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ]
                    }
                ]
            }
        }
    }

    highChartsRender1=()=> {
        Highcharts.chart({
            chart: {
              type: 'pie',
              renderTo: 'atmospheric-composition'
            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: 'Earth\'s Atmospheric Composition',
              style: {
                  fontSize: '10px',
              }
            },
            plotOptions: {
              pie: {
                  dataLabels: {
                      format: '{point.name}: {point.percentage:.1f} %'
                  },
                innerSize: '70%'
              }
            },
            series: this.state.series
          });
    }
    highChartsRender = ()=>{
        Highcharts.chart('container', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'USD to EUR exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'USD to EUR',
                data: this.state.timeData
            }]
        });
    }

    componentDidMount() {
        fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
        .then(response => response.json())
        .then((json) => {
            this.setState({
                timeData : json
            });
            //console.log(this.state.timeData);
            this.highChartsRender();
        })
        
        this.highChartsRender1();
    }
    
    render(){
        return (
            <div className="chart-component">
                <h2>Chart Component</h2>
                <Bar
                data={this.state.chartData}
                options={{
                    title : {
                        display : true,
                        text: 'IoT Devices in India',
                        fontSize : 25,
                    },
                    legend : {
                        display : true,
                        position : 'right',
                    }
                }}
                />
                <Line data={this.state.chartData} />

                <div id="atmospheric-composition"></div>
                <div id="container"></div>
            </div>
        )
    }
}

export default ChartComponent;