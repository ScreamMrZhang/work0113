(function () {
    var animationImg = document.querySelector(".bg-top>img");
    function animate(i) {
        var index = `00${i}`.slice(-3);
        requestAnimationFrame(function () {
            animationImg.src = `./assets/frames/${index}.png`;
            var nextIndex =i >= 298?40:++i;
            animate(nextIndex)
        })
    }
    animate(0);


    var leftCenterE = document.querySelector('#left-center');
    // 基于准备好的dom，初始化echarts实例
    var leftCenterChart = echarts.init(leftCenterE);
    function leftCenter() {
        // 柱状图的宽度，y是x的一半
        const offsetX = 10
        const offsetY = 5

// 绘制左侧面
        const CubeLeft = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                // 会canvas的应该都能看得懂，shape是从custom传入的
                const xAxisPoint = shape.xAxisPoint
                const c0 = [shape.x, shape.y]
                const c1 = [shape.x - offsetX, shape.y - offsetY]
                const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
                const c3 = [xAxisPoint[0], xAxisPoint[1]]
                ctx
                    .moveTo(c0[0], c0[1])
                    .lineTo(c1[0], c1[1])
                    .lineTo(c2[0], c2[1])
                    .lineTo(c3[0], c3[1])
                    .closePath()
            }
        })
// 绘制右侧面
        const CubeRight = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c1 = [shape.x, shape.y]
                const c2 = [xAxisPoint[0], xAxisPoint[1]]
                const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
                const c4 = [shape.x + offsetX, shape.y - offsetY]
                ctx
                    .moveTo(c1[0], c1[1])
                    .lineTo(c2[0], c2[1])
                    .lineTo(c3[0], c3[1])
                    .lineTo(c4[0], c4[1])
                    .closePath()
            }
        })
// 绘制顶面
        const CubeTop = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                const c1 = [shape.x, shape.y]
                const c2 = [shape.x + offsetX, shape.y - offsetY] // 右点
                const c3 = [shape.x, shape.y - offsetX]
                const c4 = [shape.x - offsetX, shape.y - offsetY]
                ctx
                    .moveTo(c1[0], c1[1])
                    .lineTo(c2[0], c2[1])
                    .lineTo(c3[0], c3[1])
                    .lineTo(c4[0], c4[1])
                    .closePath()
            }
        })
// // 绘制底面
        const CubeBottom = echarts.graphic.extendShape({
            shape: {
                x: 10,
                y: 10
            },
            buildPath: function (ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c1 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
                const c2 = [xAxisPoint[0], xAxisPoint[1]] // 右点
                const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
                const c4 = [xAxisPoint[0], xAxisPoint[1] - offsetX]
                ctx
                    .moveTo(c1[0], c1[1])
                    .lineTo(c2[0], c2[1])
                    .lineTo(c3[0], c3[1])
                    .lineTo(c4[0], c4[1])
                    .closePath()
            }
        })

// 注册图形
        echarts.graphic.registerShape('CubeLeft', CubeLeft)
        echarts.graphic.registerShape('CubeRight', CubeRight)
        echarts.graphic.registerShape('CubeTop', CubeTop)
        echarts.graphic.registerShape('CubeBottom', CubeBottom)
        const dataX = ['2016年','2017年','2018年','2019年','2021年','2022年']
        const barData = [0.08,0.10,0.09,0.06,0.07,0.07]
        const lineData = [0.02,0.03,0.09,0.07,0.10,0.08]
        option = {
            //你的代码
            // backgroundColor: '#031a40',
            legend: {
                show: true,
                right: 30,
                top: 10,
                itemGap: 30,
                itemWidth: 20,
                itemHeight: 10,
                data: ['当月值', '同比%'],
                textStyle: {
                    fontSize: 18,
                    color: '#ffffff'
                }
            },
            color: ['#097dc0', '#26D6D7'],
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 18 // 字体大小
                },
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '3%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: dataX,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: 'rgba(239, 247, 253, .1)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    fontSize: 16,
                    color: '#E7FCFF',
                    margin: 20,
                    interval: 0
                }
            },
            yAxis: [
                {
                    type: 'value',
                    // name:'时长：天',
                    nameGap: 30,
                    nameTextStyle: {
                        color: '#ffffff',
                        fontWeight: 400,
                        fontSize: 16
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: 'rgba(239, 247, 253, .1)'
                        }
                    },
                    splitLine: {
                        // show: false,
                        lineStyle: {
                            color: 'rgba(188,188,188,0.5)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 16,
                        color: '#E7FCFF'
                    },
                    min: 0,
                    // max: Math.ceil(Math.max.apply(null, dataX) / 5) * 5,
                    // interval: Math.ceil(Math.max.apply(null, dataX) / 5)
                },
                {
                    type: 'value',
                    // name:'%',
                    nameGap: 30,
                    nameTextStyle: {
                        color: '#ffffff',
                        fontWeight: 400,
                        fontSize: 16
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: 'rgba(239, 247, 253, .1)'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(239, 247, 253, .1)'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show:false,
                        fontSize: 16,
                        color: '#E7FCFF'
                    }
                }
            ],
            series: [
                {
                    name: '当月值',
                    type: 'custom',
                    renderItem: (params, api) => {
                        const location = api.coord([api.value(0), api.value(1)])
                        return {
                            type: 'group',
                            x: 0,
                            children: [
                                {
                                    type: 'CubeLeft',
                                    shape: {
                                        api,
                                        xValue: api.value(0),
                                        yValue: api.value(1),
                                        x: location[0],
                                        y: location[1],
                                        xAxisPoint: api.coord([api.value(0), 0])
                                    },
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#24a7ed'
                                            },
                                            {
                                                offset: 1,
                                                color: '#24a7ed'
                                            }
                                        ]),
                                        stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                                    }
                                },
                                {
                                    type: 'CubeRight',
                                    shape: {
                                        api,
                                        xValue: api.value(0),
                                        yValue: api.value(1),
                                        x: location[0],
                                        y: location[1],
                                        xAxisPoint: api.coord([api.value(0), 0])
                                    },
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#097dc0'
                                            },
                                            {
                                                offset: 1,
                                                color: '#097dc0'
                                            }
                                        ]),
                                        stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                                    }
                                },
                                {
                                    type: 'CubeTop',
                                    shape: {
                                        api,
                                        xValue: api.value(0),
                                        yValue: api.value(1),
                                        x: location[0],
                                        y: location[1],
                                        xAxisPoint: api.coord([api.value(0), 0])
                                    },
                                    style: {
                                        fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#148cd2'
                                            },
                                            {
                                                offset: 1,
                                                color: '#148cd2'
                                            }
                                        ]),
                                        stroke: 'rgba(3, 25, 63, .1)', //边框颜色
                                    }
                                }
                            ]
                        }
                    },
                    data: barData
                },
                {
                    name: '同比%',
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    // symbol: 'rect',
                    // symbolSize: 8,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#d6d296'
                    },
                    lineStyle: {
                        width: 3
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(193,190,154,.3)',
                            },
                                {
                                    offset: 1,
                                    color: 'rgb(193,190,154,.3)',
                                }
                            ]),
                        },
                    },
                    data: lineData
                }
            ]
        }

        leftCenterChart.setOption(option);
    }
    leftCenter()

    var leftBottomE = document.querySelector('#left-bottom');
    // 基于准备好的dom，初始化echarts实例
    var leftBottomChart = echarts.init(leftBottomE);
    function leftBottom(){
        var img = 'data:image/png;base64,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';

        var trafficWay = [
            {
                name: '招商银行 32',
                value: 32
            },{
                name: '农业银行 32',
                value: 32
            },{
                name: '工商银行 100',
                value: 100
            },{
                name: '建设银行 230',
                value: 230
            },{
                name: '中国银行 260',
                value: 260
            }
        ];

        var data = [];
        var color=['#00ffff','#00cfff','#006ced','#00ffff','#ffe000','#ffa800','#ff5b00','#ff3000']
        for (var i = 0; i < trafficWay.length; i++) {
            data.push({
                value: trafficWay[i].value,
                name: trafficWay[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 30,
                        borderColor:color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        var seriesOption = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [50, 50],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < trafficWay.length; i++) {
                                total += trafficWay[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return params.name + '\n' + '占百分比：' + percent + '%';
                            }else {
                                return '';
                            }
                        },
                    },
                    labelLine: {
                        length:30,
                        length2:30,
                        show: true,
                        color:'#00ffff'
                    }
                }
            },
            data: data
        }];
        var option = {
            // backgroundColor: '#0A2E5D',
            color : color,
            title: {
                text: '2,923',
                top: '40%',
                textAlign: "center",
                left: "49%",
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: '400'
                }
            },
            graphic: {
                elements: [{
                    type: "image",
                    z: 3,
                    style: {
                        image: img,
                        width: 60,
                        height: 60
                    },
                    left: 'center',
                    top:  'center',
                    position: [100, 100]
                }]
            },
            tooltip: {
                show: false
            },
            legend: {
                icon: "circle",
                orient: 'horizontal',
                // x: 'left',
                data:['火车','飞机','客车','轮渡'],
                right: 340,
                bottom: 150,
                align: 'right',
                textStyle: {
                    color: "#fff"
                },
                itemGap: 20
            },
            toolbox: {
                show: false
            },
            series: seriesOption
        }


        leftBottomChart.setOption(option)
        leftBottomChart.resize()
    }
    leftBottom();

    var rightBottomE = document.querySelector('#right-bottom');
    // 基于准备好的dom，初始化echarts实例
    var rightBottomChart = echarts.init(rightBottomE);
    function rightBottom(){
        var charts = {
            unit: 'Kbps',
            names: ['今年', '去年'],
            lineX: ['2016年','2017年','2018年','2019年','2021年','2022年'],
            value: [
                [451, 352, 303, 534, 95, 236 ],
                [360, 545, 80, 192, 330, 580 ]
            ]

        }
        var color = ['rgb(23,185,255', 'rgb(0,253,255']
        var lineY = []

        for (var i = 0; i < charts.names.length; i++) {
            var x = i
            if (x > color.length - 1) {
                x = color.length - 1
            }
            var data = {
                name: charts.names[i],
                type: 'line',
                color: color[x] + ')',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[x] + ', 0.3)'
                        }, {
                            offset: 0.8,
                            color: color[x] + ', 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                symbol: 'circle',
                symbolSize: 5,
                data: charts.value[i]
            }
            lineY.push(data)
        }

        var option = {
            // backgroundColor:'#1b2735',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: charts.names,
                textStyle: {
                    fontSize: 12,
                    color: 'rgb(0,253,255,0.6)'
                },
                right: '4%'
            },
            grid: {
                top: '14%',
                left: '4%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: charts.lineX,
                axisLabel: {
                    textStyle: {
                        color: 'rgb(255,253,255)'
                    },
                    // formatter: function(params) {
                    //     return params.split(' ')[0] + '\n' + params.split(' ')[1]
                    // }
                }
            },
            yAxis: {
                // name: charts.unit,
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: 'rgb(255,253,255)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgb(23,255,243,0.3)'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgb(0,253,255,0.6)'
                    }
                }
            },
            series: lineY
        }

        rightBottomChart.setOption(option)
    }
    rightBottom();


    var rightCenterE = document.querySelector('#right-center');
    // 基于准备好的dom，初始化echarts实例
    var rightCenterChart = echarts.init(rightCenterE);
    function rightCenter() {
        var value = [532,671,1155];
        var rightValue=['4,832,849','108,978','53,126']
        var max1 = Math.max.apply(null,value) * 1.2;
        var data1 = [];

        //data1存放背景条的数值，for循环使其数量与value一致
        for (var i = value.length - 1; i >= 0; i--) {
            data1.push(max1);
        };

        var option = {
            // backgroundColor: '#051F54',
            grid: {
                left: "-5%",
                top: "15%",
                bottom: "5%",
                right: "5%",
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max : max1,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    margin: 0,
                    verticalAlign:'right',
                    align: 'left',
                    padding: [-30, 0, 0, 0],
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    }
                },
                data : ['受限货币资金','委托贷款逾期','对外担保逾期']
            },
            series: [{
                type: 'bar',
                animation: false,
                barWidth: '5%',
                itemStyle: {
                    normal: {
                        // 默认渐变颜色
                        color: function (params) {
                            var gradientColors = [
                                { // 第一个柱子的渐变色
                                    x: 0, y: 0, x2: 1, y2: 0,
                                    colorStops: [
                                        { offset: 0, color: 'rgb(7,46,50)' },
                                        { offset: 1, color: 'rgba(36,237,255,1)' }
                                    ]
                                },
                                { // 第二个柱子的渐变色
                                    x: 0, y: 0, x2: 1, y2: 0,
                                    colorStops: [
                                        { offset: 0, color: 'rgb(7,46,50)' },
                                        { offset: 1, color: 'rgb(225,216,72)' }
                                    ]
                                },
                                { // 第三个柱子的渐变色
                                    x: 0, y: 0, x2: 1, y2: 0,
                                    colorStops: [
                                        { offset: 0, color: 'rgb(7,46,50)' },
                                        { offset: 1, color: 'rgba(36,237,255,1)' }
                                    ]
                                }
                            ];
                            return gradientColors[params.dataIndex]; // 根据柱子的索引选择对应渐变色
                        }
                    }
                },
                data : value,
                z:1
            }, {
                //辅助1：真实数值的圆点
                // name: '真实值圆点',
                type: 'scatter',
                symbolOffset: ['10%', '0'],
                symbolSize: 8,
                itemStyle: {
                    borderWidth: 0,
                    color: 'rgba(255,255,255,1)'
                },
                data : value,
                z:5
            }, {
                //辅助2：真实数值的圆点外侧圆环
                // name: '真实值圆环',
                type: 'scatter',
                symbolOffset: ['10%', '0'],
                symbolSize: 15,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: 'rgba(101,224,255,1)',
                    //shadowBlur: 15,
                    //shadowColor: 'rgba(101,224,255,1)',
                    color: 'rgba(255,255,255,0.43)'
                },
                data : value,
                z:10
            },{
                //辅助3：背景条
                // name: '背景条',
                type: 'bar',
                animation: false,
                barGap: '-100%',
                barWidth: '5%',
                label: {
                    show: true,
                    position: 'insideRight',
                    verticalAlign:'right',
                    padding: [-30, -10, 0, 0],
                    distance: 15,
                    color: '#fff',
                    formatter: function(params) {
                        console.info(params);

                        return `{customStyle${params.dataIndex}| ${rightValue[params.dataIndex]}} {unitStyle|万元}`;
                    },
                    rich: {
                        customStyle0: {
                            color: '#54b1b6', // 第一个颜色
                            fontSize: 24,
                        },
                        customStyle1: {
                            color: '#e5d92e', // 第二个颜色
                            fontSize: 24,
                        },
                        customStyle2: {
                            color: '#54b1b6', // 第三个颜色
                            fontSize: 24,
                        },
                        // 单位样式
                        unitStyle: {
                            color: '#ffffff', // 白色
                            fontSize: 14,
                        }

                    }

                },
                itemStyle: {
                    normal: {
                        color: 'rgba(62,78,123,1)'
                    }
                },
                data : data1,
                z:0
            }],
            graphic: [
                {
                    type: 'image',
                    id: 'svg-icon-1',
                    left: '5%',
                    top: '10%', // 位置调整
                    style: {
                        image: '../big/assets/images/3/table.png' // 填入第一个SVG图标
                    }
                },
                {
                    type: 'image',
                    id: 'svg-icon-2',
                    left: '5%',
                    top: '35%', // 位置调整
                    style: {
                        image: '../big/assets/images/3/building.png'
                    }
                },
                {
                    type: 'image',
                    id: 'svg-icon-3',
                    left: '5%',
                    top: '62%', // 位置调整
                    style: {
                        image: '../big/assets/images/3/server.png'
                    }
                }
            ]

        };
        rightCenterChart.setOption(option)
        rightCenterChart.resize()
    }
    rightCenter()


    var rightTopE = document.querySelector('#right-top');
    // 基于准备好的dom，初始化echarts实例
    var rightTopChart = echarts.init(rightTopE);
    function rightTop() {
        var option = {
            // backgroundColor: '#ffffff',
            series: [{
                type: 'liquidFill',
                name: '',
                center: ['75%', '50%'],
                radius: '55%',
                // 水球颜色
                color: ['#0B5E8B', '#227DB3', '#3F91CC'],
                data: [0.8],
                label: {
                    formatter: function (param) {
                        return  '93家';
                    },
                    fontSize: 20,
                    color: '#fff'
                },
                // outline  外边
                outline: {
                    borderDistance: 5,
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#00C0FF',
                    },
                },
                // 内图 背景色 边
                backgroundStyle: {
                    color: 'rgba(0,37,83,0.8)',
                }
            }, {
                type: 'liquidFill',
                name: '存款',
                // 水球颜色
                color: ['#49d088', '#38b470', '#2aaf66'],
                center: ['40%', '70%'],
                data: [0.15],
                radius: '35%',
                label: {
                    formatter: function (param) {
                        return param.value * 100 + '家';
                    },
                    fontSize: 14,
                    color: '#fff'
                },
                // outline  外边
                outline: {
                    borderDistance: 5,
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#00FFB0',
                    },
                },
                // 内图 背景色 边
                backgroundStyle: {
                    color: 'rgba(0,37,83,0.8)',
                }
            }, {
                type: 'liquidFill',
                name: '资产提升',
                // 水球颜色
                color: ['#E3B340', '#F4B30E', '#EACE36'],
                center: ['25%', '25%'],
                data: [0.29],
                radius: '40%',
                label: {
                    formatter: function (param) {
                        return '29家';
                    },
                    fontSize: 16,
                    color: '#fff'
                },
                // outline  外边
                outline: {
                    borderDistance: 5,
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#FFBF11',
                    },
                },
                // 内图 背景色 边
                backgroundStyle: {
                    color: 'rgba(0,37,83,0.8)',
                }
            }
            ],
        };



        rightTopChart.setOption(option)
    }
    rightTop()

})(window)