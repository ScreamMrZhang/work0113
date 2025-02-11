(function () {
    // var animationImg = document.querySelector(".bg-top>img");
    // function animate(i) {
    //     var index = `00${i}`.slice(-3);
    //     requestAnimationFrame(function () {
    //         animationImg.src = `./assets/frames/${index}.png`;
    //         var nextIndex =i >= 298?40:++i;
    //         animate(nextIndex)
    //     })
    // }
    // animate(0);


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
        let selectedIndex = '';
        let hoveredIndex = '';
        option = getPie3D(
            [
                {
                    name: 'cc',
                    value: 47,
                    itemStyle: {
                        color: '#fbe25a',
                    },
                },
                {
                    name: 'aa',
                    value: 44,
                    itemStyle: {
                        color: '#4fb3fd',
                    },
                },
                {
                    name: 'bb',
                    value: 32,
                    itemStyle: {
                        color: '#5ab2bc',
                    },
                },
                {
                    name: 'ee',
                    value: 16,
                    itemStyle: {
                        color: '#4294c3',
                    },
                },
                {
                    name: 'dd',
                    value: 23,
                    itemStyle: {
                        color: '#6ce2fe',
                    },
                },
            ],
            0.59
        );
        // 生成扇形的曲面参数方程
        function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
            // 计算
            const midRatio = (startRatio + endRatio) / 2;

            const startRadian = startRatio * Math.PI * 2;
            const endRadian = endRatio * Math.PI * 2;
            const midRadian = midRatio * Math.PI * 2;

            // 如果只有一个扇形，则不实现选中效果。
            if (startRatio === 0 && endRatio === 1) {
                // eslint-disable-next-line no-param-reassign
                isSelected = false;
            }

            // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
            // eslint-disable-next-line no-param-reassign
            k = typeof k !== 'undefined' ? k : 1 / 3;

            // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
            const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
            const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

            // 计算高亮效果的放大比例（未高亮，则比例为 1）
            const hoverRate = isHovered ? 1.05 : 1;

            // 返回曲面参数方程
            return {
                u: {
                    min: -Math.PI,
                    max: Math.PI * 3,
                    step: Math.PI / 32,
                },

                v: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },

                x(u, v) {
                    if (u < startRadian) {
                        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                y(u, v) {
                    if (u < startRadian) {
                        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                z(u, v) {
                    if (u < -Math.PI * 0.5) {
                        return Math.sin(u);
                    }
                    if (u > Math.PI * 2.5) {
                        return Math.sin(u) * h * 0.1;
                    }
                    // 当前图形的高度是Z根据h（每个value的值决定的）
                    return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
                },
            };
        }
        // 生成模拟 3D 饼图的配置项
        function getPie3D(pieData, internalDiameterRatio) {
            const series = [];
            // 总和
            let sumValue = 0;
            let startValue = 0;
            let endValue = 0;
            const legendData = [];
            const k =
                typeof internalDiameterRatio !== 'undefined'
                    ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                    : 1 / 3;

            // 为每一个饼图数据，生成一个 series-surface 配置
            for (let i = 0; i < pieData.length; i += 1) {
                sumValue += pieData[i].value;

                const seriesItem = {
                    name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                    type: 'surface',
                    parametric: true,
                    wireframe: {
                        show: false,
                    },
                    pieData: pieData[i],
                    pieStatus: {
                        selected: false,
                        hovered: false,
                        k,
                    },
                };

                if (typeof pieData[i].itemStyle !== 'undefined') {
                    const { itemStyle } = pieData[i];

                    // eslint-disable-next-line no-unused-expressions
                    typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
                    // eslint-disable-next-line no-unused-expressions
                    typeof pieData[i].itemStyle.opacity !== 'undefined'
                        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                        : null;

                    seriesItem.itemStyle = itemStyle;
                }
                series.push(seriesItem);
            }
            // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
            // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
            console.log(series);
            for (let i = 0; i < series.length; i += 1) {
                endValue = startValue + series[i].pieData.value;

                series[i].pieData.startRatio = startValue / sumValue;
                series[i].pieData.endRatio = endValue / sumValue;
                series[i].parametricEquation = getParametricEquation(
                    series[i].pieData.startRatio,
                    series[i].pieData.endRatio,
                    false,
                    false,
                    k,
                    // 我这里做了一个处理，使除了第一个之外的值都是10
                    series[i].pieData.value === series[0].pieData.value ? 35 : 10
                );

                startValue = endValue;

                legendData.push(series[i].name);
            }

            // 准备待返回的配置项，把准备好的 legendData、series 传入。
            const option = {
                // animation: false,

                tooltip: {
                    formatter: (params) => {
                        if (params.seriesName !== 'mouseoutSeries') {
                            return `${
                                params.seriesName
                            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                                params.color
                            };"></span>${option.series[params.seriesIndex].pieData.value}`;
                        }
                        return '';
                    },
                },
                xAxis3D: {
                    min: -1,
                    max: 1,
                },
                yAxis3D: {
                    min: -1,
                    max: 1,
                },
                zAxis3D: {
                    min: -1,
                    max: 1,
                },
                grid3D: {
                    show: false,
                    boxHeight: 5,
                    top: '-10%',
                    bottom: '5%',
                    viewControl: {
                        // 3d效果可以放大、旋转等，请自己去查看官方配置
                        alpha: 35,
                        // beta: 30,
                        rotateSensitivity: 1,
                        zoomSensitivity: 0,
                        panSensitivity: 0,
                        autoRotate: true,
                        distance: 135,
                    },
                    // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
                    postEffect: {
                        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
                        enable: false,
                        bloom: {
                            enable: true,
                            bloomIntensity: 0.1,
                        },
                        SSAO: {
                            enable: true,
                            quality: 'medium',
                            radius: 2,
                        },
                        // temporalSuperSampling: {
                        //   enable: true,
                        // },
                    },
                },
                series,
            };
            return option;
        }
        //  修正取消高亮失败的 bug
        // 监听 mouseover，近似实现高亮（放大）效果
        leftBottomChart.on('mouseover', function (params) {
            // 准备重新渲染扇形所需的参数
            let isSelected;
            let isHovered;
            let startRatio;
            let endRatio;
            let k;
            let i;

            // 如果触发 mouseover 的扇形当前已高亮，则不做操作
            if (hoveredIndex === params.seriesIndex) {
                return;

                // 否则进行高亮及必要的取消高亮操作
            } else {
                // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
                if (hoveredIndex !== '') {
                    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                    isSelected = option.series[hoveredIndex].pieStatus.selected;
                    isHovered = false;
                    startRatio = option.series[hoveredIndex].pieData.startRatio;
                    endRatio = option.series[hoveredIndex].pieData.endRatio;
                    k = option.series[hoveredIndex].pieStatus.k;
                    i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
                    // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                    option.series[hoveredIndex].parametricEquation = getParametricEquation(
                        startRatio,
                        endRatio,
                        isSelected,
                        isHovered,
                        k,
                        i
                    );
                    option.series[hoveredIndex].pieStatus.hovered = isHovered;

                    // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                    hoveredIndex = '';
                }

                // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
                if (params.seriesName !== 'mouseoutSeries') {
                    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                    isSelected = option.series[params.seriesIndex].pieStatus.selected;
                    isHovered = true;
                    startRatio = option.series[params.seriesIndex].pieData.startRatio;
                    endRatio = option.series[params.seriesIndex].pieData.endRatio;
                    k = option.series[params.seriesIndex].pieStatus.k;

                    // 对当前点击的扇形，执行高亮操作（对 option 更新）
                    option.series[params.seriesIndex].parametricEquation = getParametricEquation(
                        startRatio,
                        endRatio,
                        isSelected,
                        isHovered,
                        k,
                        option.series[params.seriesIndex].pieData.value + 5
                    );
                    option.series[params.seriesIndex].pieStatus.hovered = isHovered;

                    // 记录上次高亮的扇形对应的系列号 seriesIndex
                    hoveredIndex = params.seriesIndex;
                }

                // 使用更新后的 option，渲染图表
                leftBottomChart.setOption(option);
            }
        });

        // 修正取消高亮失败的 bug
        leftBottomChart.on('globalout', function () {
            if (hoveredIndex !== '') {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                isSelected = option.series[hoveredIndex].pieStatus.selected;
                isHovered = false;
                k = option.series[hoveredIndex].pieStatus.k;
                startRatio = option.series[hoveredIndex].pieData.startRatio;
                endRatio = option.series[hoveredIndex].pieData.endRatio;
                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                i = option.series[hoveredIndex].pieData.value === option.series[0].pieData.value ? 35 : 10;
                option.series[hoveredIndex].parametricEquation = getParametricEquation(
                    startRatio,
                    endRatio,
                    isSelected,
                    isHovered,
                    k,
                    i
                );
                option.series[hoveredIndex].pieStatus.hovered = isHovered;

                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = '';
            }

            // 使用更新后的 option，渲染图表
            leftBottomChart.setOption(option);
        });
        leftBottomChart.setOption(option);
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
        var color = ['rgb(23,185,255', 'rgb(214,210,150']
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
        var obj = {
            0: '56.8%',
            1: '33.7%',
            2: '24.3%',
            3: '16.5%',
            4: '9.8%',
            5: '5.0%',
            6: '0.6%',
        };

        var option = {
            backgroundColor: "#000",
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '15%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function(params) {
                    return params[0].name + ': ' + params[0].value;
                }
            },
            xAxis: {
                show: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color: 'rgba(255,255,255,1)'
                },
                data: ['土地','新筑股份','财产保险','发展投诚','轨道投资','新能源','通讯'],
            },
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle:{
                        type: 'dashed',
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: true
                }
            },
            color: ['#e54035'],
            series: [{
                name: 'hill',
                type: 'pictorialBar',
                barCategoryGap: '-10%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                label: {
                    show: true,
                    position: 'top',
                    distance: 4,
                    color: '#fff',
                    // fontWeight: 'bolder',
                    fontSize: 12,
                    formatter: function(params) {
                        return obj[params.dataIndex];
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            let colorList = [
                                'rgba(74, 159, 187,0.7)', 'rgba(39, 103, 185,0.7)',
                                'rgba(86, 178, 160,0.7)', 'rgba(155, 149, 38,0.7)',
                                'rgba(32, 79, 110,0.7)', 'rgba(135, 91, 20,0.7)',
                                'rgba(47, 71, 149,0.7)'
                            ];
                            return colorList[params.dataIndex];
                        }
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data: [6.0, 5.0, 4.0, 3.0, 2.0, 1.0, 2.0],
                z: 10
            }]
        };

        rightTopChart.setOption(option)
    }
    rightTop()

    var earthE = document.querySelector('#earth');
    // 基于准备好的dom，初始化echarts实例
    var earthChart = echarts.init(earthE);
    function earth() {
        earthChart.setOption({
            // 图例设置
            legend: {
                selectedMode: 'multiple',
                x: 'right',
                y: 'bottom',
                // data: ds.map(item => {
                //     return item.name // 数据来源
                // }),
                padding: [0, 50, 80, 0], // 填充位置,上、右、下、左
                orient: 'vertical', // 排列方式，vertical:垂直排列
                textStyle: {
                    color: '#fff', // 文字颜色
                }
            },
            // 地球背景色
            // backgroundColor: '#058198',
            // 地球参数设置
            globe: {
                top: '-5%',
                // left: '3%',
                // right: '3%',
                // bottom: '5%',
                baseTexture: './images/1/map.png',
                shading: 'color', // 地球中三维图形的着色效果
                viewControl: {
                    alpha: "60deg",
                    autoRotate: true, // 是否开启视角绕物体的自动旋转查看
                    autoRotateSpeed: 6, //物体自转的速度,单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
                    autoRotateAfterStill: 2, // 在鼠标静止操作后恢复自动旋转的时间间隔,默认 3s
                    rotateSensitivity: 2, // 旋转操作的灵敏度，值越大越灵敏.设置为0后无法旋转。[1, 0]只能横向旋转.[0, 1]只能纵向旋转
                    targetCoord: [116.46, 39.92], // 定位到北京
                    maxDistance: 350,
                    minDistance: 350
                }
            },
            // 地球文字显示信息配置
            // series: series
        })

        // earthChart.setOption(option)
    }
    earth()

})(window)