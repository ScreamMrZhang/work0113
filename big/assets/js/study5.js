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

    var leftTopE = document.querySelector('#left-top');
    // 基于准备好的dom，初始化echarts实例
    var leftTopChart = echarts.init(leftTopE);
    function leftTop(){
        const layers = 4; // 分层数量
        const height = 40; // 圆锥总高度
        const radius = 300; // 圆锥底部半径
        const names = ['10%   集团本部','25%   二级企业','30%   三级企业','35%   其他组织'];
        const color = ['#fff','#000','#fff','#000'];

        // 生成 3D 圆锥的顶点数据
        function generateConeData() {
            const data = [];
            for (let i = 0; i < layers; i++) {
                const bottomRadius = radius * (1 - i / layers); // 当前层的顶部半径
                const topRadius = radius * (1 - (i + 1) / layers); // 当前层的底部半径

                data.push({
                    name: `${names[i]}`,
                    type: 'surface',
                    parametric: true,
                    wireframe: false,
                    shading: 'realistic',
                    realisticMaterial: {
                        detailTexture: '',
                        roughness: 0.6,
                    },
                    parametricEquation: {
                        u: {
                            min: -0.01,
                            max: Math.PI * 2,
                            step: Math.PI / 50,
                        },
                        v: {
                            min: 0.1,
                            max: 1,
                            step: 0.06,
                        },
                        x: (u, v) => {
                            const r = bottomRadius + v * (topRadius - bottomRadius);
                            return r * Math.cos(u);
                        },
                        y: (u, v) => {
                            const r = bottomRadius + v * (topRadius - bottomRadius);
                            return r * Math.sin(u);
                        },
                        z: (u, v) => (height / layers) * i + v * (height / layers),
                    },
                });
            }
            return data;
        }

        // 配置项
        const option = {
            // backgroundColor:"#6e6b6b",
            tooltip: {},
            visualMap: {
                show: false,
                dimension: 2,
                min: 0,
                max: height,
                inRange: {
                    color: ['rgba(0,0,255,0.8)', 'rgba(0,255,255,0.8)', 'rgba(255,255,0,0.8)', 'rgba(2,110,110,0.8)'],
                },
            },
            xAxis3D: {
                type: 'value',
                show:false,
            },
            yAxis3D: {
                type: 'value',
                show:false,
            },
            zAxis3D: {
                type: 'value',
                show:false,
            },
            grid3D: {
                left:"-20%",
                show:false,
                viewControl: {
                    autoRotate: true, // 自动旋转
                    autoRotateSpeed:100,
                },
            },
            series: generateConeData(),
            legend: {
                show: true, // 显示图例
                orient: 'vertical',
                right: '0', // 图例居中
                top: 'center', // 图例显示在底部
                // left:'75%',
                selectedMode: false, //取消图例上的点击事件
                textStyle: {
                    fontSize: 10,
                    color: '#fff'
                },
                height:380,
                itemGap:10,
                itemStyle:{
                    color:['#fff','#000','#fff','#000'],
                },
                padding:100


            },
        };

        // 设置配置项并渲染
        leftTopChart.setOption(option);
    }
    leftTop()



    var leftBottomE = document.querySelector('#left-bottom');
    // 基于准备好的dom，初始化echarts实例
    var leftBottomChart = echarts.init(leftBottomE);
    function leftBottom(){
        const CubeLeft = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c0 = [shape.x, shape.y]//右上
                const c1 = [shape.x - 15, shape.y - 4]//左上
                const c2 = [xAxisPoint[0] - 15, xAxisPoint[1] - 4]//坐下
                const c3 = [xAxisPoint[0], xAxisPoint[1]]//右下
                ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
            }
        })
        const CubeRight = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                const xAxisPoint = shape.xAxisPoint
                const c1 = [shape.x, shape.y]
                const c2 = [xAxisPoint[0], xAxisPoint[1]]
                const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] - 4]
                const c4 = [shape.x + 10, shape.y - 4]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
            }
        })
        const CubeTop = echarts.graphic.extendShape({
            shape: {
                x: 0,
                y: 0
            },
            buildPath: function (ctx, shape) {
                // 逆时针 角 y 负数向上  X 负数向左
                const c1 = [shape.x, shape.y + 0]
                const c2 = [shape.x + 10, shape.y - 4]
                const c3 = [shape.x - 4, shape.y - 8]
                const c4 = [shape.x - 15, shape.y - 4]
                ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
            }
        })
        echarts.graphic.registerShape('CubeLeft', CubeLeft)
        echarts.graphic.registerShape('CubeRight', CubeRight)
        echarts.graphic.registerShape('CubeTop', CubeTop)

        option = {
            // backgroundColor: '#031C5D',
            tooltip: {

                trigger: 'item',
                textStyle: {
                    fontSize: 15
                },
                // formatter:'{b}'
            },
            legend: {

                data: [
                    {
                        name:'党支部大会',
                        itemStyle:{
                            color:'#62caf9'
                        }
                    },
                    {
                        name:'支部委员会',
                        itemStyle:{
                            color:'#71e072'
                        }
                    },
                    {
                        name:'党小组会',
                        itemStyle:{
                            color:'#f6e46d'
                        }
                    },
                    {
                        name:'党课',
                        itemStyle:{
                            color:'#489fdc'
                        }
                    },
                ],
                icon: 'circle',
                itemWidth: 14,
                itemHeight: 14,
                right: 5,
                selectedMode: false, //取消图例上的点击事件
                textStyle: {
                    fontSize: 10,
                    color: '#FFFFFF'
                }
            },
            grid: {
                show: false,
                left: '5%',
                right: '5%',
                bottom: '12%',
                top: '20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['党委', '党总支', '党支部'],
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                offset: 10,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    fontSize: 20,
                    color: '#fff'
                }
            },
            yAxis: {
                name: '个',
                nameTextStyle: {
                    fontSize: 15,
                    color: '#fff'
                },
                nameGap: 10,
                show: true,
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white',
                        width: 3
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.5)',
                        width: 1
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    fontSize: 10,
                    color: '#fff'
                },
                boundaryGap: ['5%', '5%']
            },
            series: [{
                type: 'custom',
                name: '党支部大会',
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)])
                    return {
                        type: 'group',
                        children: [{
                            type: 'CubeLeft',
                            position: [-45, 0],
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#4593ba'
                                }, {
                                    offset: 1,
                                    color: '#6adcd9'
                                }])
                            }
                        }, {
                            type: 'CubeRight',
                            position: [-45, 0],
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#62caf9' // 顶部
                                }, {
                                    offset: 1,
                                    color: '#76f3f0' // 底部
                                }])
                            }
                        }, {
                            type: 'CubeTop',
                            position: [-45, 0],
                            shape: {
                                api,
                                xValue: api.value(0),
                                yValue: api.value(1),
                                x: location[0],
                                y: location[1],
                                xAxisPoint: api.coord([api.value(0), 0])
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#6fe5d5'
                                }, {
                                    offset: 1,
                                    color: '#6adcd8'
                                }])
                            }
                        }]
                    }
                },
                data: [6, 8, 8]
            },
                {
                    type: 'custom',
                    name: '支部委员会',
                    renderItem: (params, api) => {

                        const location = api.coord([api.value(0), api.value(1)])
                        return {
                            type: 'group',
                            children: [{
                                type: 'CubeLeft',
                                position: [-15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#5bb698'
                                    }, {
                                        offset: 1,
                                        color: '#6bd67a'
                                    }])
                                }
                            }, {
                                type: 'CubeRight',
                                position: [-15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#7bf3c5' // 顶部
                                    }, {
                                        offset: 1,
                                        color: '#79f18d' // 底部
                                    }])
                                }
                            }, {
                                type: 'CubeTop',
                                position: [-15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#71e072'
                                    }, {
                                        offset: 1,
                                        color: '#67ce79'
                                    }])
                                }
                            }]
                        }
                    },
                    data: [30, 40, 20]
                },
                {
                    type: 'custom',
                    name: '党小组会',
                    renderItem: (params, api) => {
                        const location = api.coord([api.value(0), api.value(1)])

                        return {
                            type: 'group',
                            children: [{
                                type: 'CubeLeft',
                                position: [15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#d7a81b'
                                    }, {
                                        offset: 1,
                                        color: '#cbc61f'
                                    }])
                                }
                            }, {
                                type: 'CubeRight',
                                position: [15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#fef832' // 顶部
                                    }, {
                                        offset: 1,
                                        color: '#f5bf21' // 底部
                                    }])
                                }
                            }, {
                                type: 'CubeTop',
                                position: [15, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#f6e46d'
                                    }, {
                                        offset: 1,
                                        color: '#d8b261'
                                    }])
                                }
                            }]
                        }
                    },
                    data: [40, 50, 30]
                },
                {
                    type: 'custom',
                    name: '党课',
                    renderItem: (params, api) => {
                        const location = api.coord([api.value(0), api.value(1)])

                        return {
                            type: 'group',
                            children: [{
                                type: 'CubeLeft',
                                position: [45, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#1477BD'
                                    }, {
                                        offset: 1,
                                        color: '#00FFFE'
                                    }])
                                }
                            }, {
                                type: 'CubeRight',
                                position: [45, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#002E75' // 顶部
                                    }, {
                                        offset: 1,
                                        color: '#00B0D0' // 底部
                                    }])
                                }
                            }, {
                                type: 'CubeTop',
                                position: [45, 0],
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0],
                                    y: location[1],
                                    xAxisPoint: api.coord([api.value(0), 0])
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#33F7FB'
                                    }, {
                                        offset: 1,
                                        color: '#00FFFE'
                                    }])
                                }
                            }]
                        }
                    },
                    data: [35, 45, 20]
                }]
        }


        leftBottomChart.setOption(option)
        leftBottomChart.resize()
    }
    leftBottom();






    var rightTopE = document.querySelector('#right-top');
    // 基于准备好的dom，初始化echarts实例
    var rightTopChart = echarts.init(rightTopE);
    function rightTop() {
        option = {
            // backgroundColor: 'rgba(0,0,0,.5)',
            legend: {
                top: '0%',
                right: '2%',
                orient: 'vertical',
                textStyle: {  color: '#fff', fontSize: 22, },
                data: ['人数'],
                icon: 'roundRect',
            },
            radar: {
                radius: '60%',
                center: ['50%', '52%'],
                startAngle: 0,
                triggerEvent: true,
                name: {  textStyle: { color: '#fff', fontSize: '20', borderRadius: 3, padding: [20, 5] } },
                nameGap: '2',
                indicator: [
                    { name: '无党派人士', max: 4000 },
                    { name: '群众', max: 4000 },
                    { name: '共青团员', max: 4000 },
                    { name: '共产党员', max: 4000 },
                ],
                splitArea: {
                    areaStyle: {
                        color: [ 'rgba(0,255,255, 0.1)', 'rgba(0,255,255, 0.2)', 'rgba(0,255,255, 0.3)', 'rgba(0,255,255, 0.4)', 'rgba(0,255,255, 0.5)', 'rgba(0,255,255, 0.6)', ].reverse(),
                        shadowColor: 'rgba(0, 0, 0, 1)',
                        shadowBlur: 30,
                        shadowOffsetX: 10,
                        shadowOffsetY: 10
                    }
                },
                axisLine: {  lineStyle: { color: 'rgba(0,206,209, 0.3)' } },
                splitLine: {
                    lineStyle: {
                        width: 1,
                        color: [ 'rgba(0,206,209, 0.1)', 'rgba(0,206,209, 0.2)', 'rgba(0,206,209, 0.3)', 'rgba(0,206,209, 0.4)', 'rgba(0,206,209, 0.5)', 'rgba(0,206,209, 0.6)' ].reverse()
                    }
                }
            },
            series: [{
                name: '人数',
                type: 'radar',
                areaStyle: { color: 'rgba(127,255,210, 0.5)' },
                symbol: 'circle',
                symbolSize: 12,
                itemStyle: { color: 'rgba(127,255,210,0.8)', borderColor: 'rgba(127,255,210,0.2)', borderWidth: 10, },
                lineStyle: { color: 'rgba(127,255,210, 0.6)', width: 2 },
                label: { show: false, },
                data: [ [855, 204, 983, 3601] ]
            },
                // {
                //     name: '2020评分',
                //     type: 'radar',
                //     areaStyle: { color: 'rgba(255,237,145, 0.5)' },
                //     symbol: 'circle',
                //     symbolSize: 12,
                //     itemStyle: { color: 'rgba(255,237,145,0.8)', borderColor: 'rgba(255,237,145,0.2)', borderWidth: 10, },
                //     lineStyle: { color: 'rgba(255,237,145, 0.6)', width: 2 },
                //     data: [ [5300, 15000, 12800, 13500, 15000] ]
                // }
            ]
        };

        rightTopChart.setOption(option)
    }
    rightTop()



})(window)