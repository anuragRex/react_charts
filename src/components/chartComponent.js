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
import Highstock from 'highcharts/highstock';

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
            },
            seriesOptions: [],
            seriesFilterOptions: [],
            seriesCounter : 0,
            names : ['MSFT', 'AAPL', 'GOOG'],
        }  //end of state
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
    
    createChart = () => {
        Highstock.stockChart('highchart', {
    
            rangeSelector: {
                selected: 4
            },
    
            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
    
            plotOptions: {
                series: {
                    compare: 'percent',
                    showInNavigator: true
                }
            },
    
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>({point.change}%)<br/>',
                valueDecimals: 2,
                split: true
            },
            series: this.state.seriesOptions
        });
        
      }

    getStockChartAPI =() =>{
        //https://www.highcharts.com/samples/data/msft-c.json
        //https://www.highcharts.com/samples/data/aapl-c.json
        // https://www.highcharts.com/samples/data/goog-c.json
        fetch('https://www.highcharts.com/samples/data/msft-c.json')
        .then(response => response.json())
        .then((json) => {
            this.setState((prevState)=>({
                seriesOptions:[...prevState.seriesOptions, {color: 'black',name:'MSFT',data:json}]
            }));

            //console.log(this.state.seriesOptions);
            this.createChart();
        });
        fetch('https://www.highcharts.com/samples/data/aapl-c.json')
        .then(response => response.json())
        .then((json) => {
            this.setState((prevState)=>({
                seriesOptions:[...prevState.seriesOptions, {color: 'purple',name:'AAPL',data:json}]
            }));

            //console.log(this.state.seriesOptions);
            this.createChart();
        });
        fetch('https://www.highcharts.com/samples/data/goog-c.json')
        .then(response => response.json())
        .then((json) => {
            this.setState((prevState)=>({
                seriesOptions:[...prevState.seriesOptions, { name:'GOOG',data:json}]
            }));

            //console.log(this.state.seriesOptions);
            this.createChart();
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
        this.getStockChartAPI();
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
                <h2> High Chart local Temperature</h2>
                <div id="highchart"></div>
            </div>
        )
    }
}

export default ChartComponent;