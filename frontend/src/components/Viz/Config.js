import echarts from 'echarts'


export function PieChartUser(data) {
    if(data === undefined) {
        data = [];
        return {};
    }
    var option = {
            title: {
                subtext: 'My Statistics',
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: data
                    // [
                    //     {
                    //         value:30,
                    //         name: 'Private Notes',
                    //     },
                    //     {value:23, name: 'Public Notes'},
                    //     {value:42, name: 'Group Notes Shared'}
                    // ]
                    ,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    return option;
}


export function bubble(data) {

    var data = [
        [[10,12,20,'Java'],[20,32.4,10,'Python']]];


    var option = {


        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: [{
            name: '1990',
            data: data[0],
            type: 'scatter',
            symbolSize: function (data) {
                return data[2] * 3;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        }]
    };
    return option;
}


export function PieChartAll(data) {
    if(data === undefined) {
        data = [];
        return {};
    }

    var option = {
        title: {
            subtext: 'Total Statistics',
            left: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: data
                // [
                //     {
                //         value:150,
                //         name: 'Average Private Notes',
                //     },
                //     {value:535, name: 'Average Public Notes'},
                //     {value:510, name: 'Average Group Notes'}
                // ]
                ,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}

export function TagOfUser(data) {
    if(data === undefined) {
        data = {dataset: {}};
        return {};
    }
    
    var option = {
        dataset: {

            ...data
            // [
            //     ['popularity index', 'popularity amount', 'Tag'],
            //     [89.3, 58212, 'Java'],
            //     [57.1, 78254, 'Python'],
            //     [74.4, 41032, 'HTML'],
            //     [30.1, 12755, 'C++'],
            //     [57.1, 78254, 'Maths'],
            //     [24.4, 41032, 'Science'],
            //     [5.1, 12755, 'C'],
            // ]
        },
        grid: {containLabel: true},
        xAxis: {name: 'popularity amount'},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#D7DA8B', '#E15457']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'popularity amount',
                    // Map the "product" column to Y axis
                    y: 'Tag'
                }
            }
        ]
    };
    return option;

}


export function yourDetails(data) {

    if(data === undefined) {
        data = [];
        return {};
    }
    

var option = {

    // title: {
    //     text: 'Your Current Statistics',
    //     left: 'center',
    //     top: 20,
    //     textStyle: {
    //         color: '#000'
    //     }
    // },

    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },

    // visualMap: {
    //     show: false,
    //     min: 0,
    //     max: 600,
    //     // color: 'rgba(0, 0, 0, 0.5)',
    //     // inRange: {
    //     //     colorLightness: [0, 1]
    //     // }
    // }
    
    series : [
        {
            type:'pie',
            radius : '55%',
            center: ['50%', '40%'],
            data:data
            // [
            //     {value:335, name:'Recommended Notes'},
            //     {value:310, name:'Private Notes'},
            //     {value:274, name:'Public Notes'},
            //     {value:400, name:'Group Notes'}
            // ].sort(function (a, b) { return a.value - b.value; })
            ,
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 1)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        // color: 'rgba(0, 0, 50, 0.9)'
                    },
                    smooth: 0.5,
                    length: 30,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 200,
                    // shadowColor: 'rgba(0, 0, 0, 0.9)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            // animationDelay: function (idx) {
            //     return Math.random() * 200;
            // }
        }
    ]
};
return option;
}

