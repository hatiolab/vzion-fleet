Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Chart', 'Ext.chart.series.Series'],
    onReady: function() {
        window.generateData = function(n, floor) {
            var data = [],
                p = (Math.random() * 11) + 1,
                i;

            floor = (!floor && floor !== 0) ? 20 : floor;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Ext.Date.monthNames[i % 12],
                    data1: Math.floor(Math.max((Math.random() * 100), floor)),
                    data2: Math.floor(Math.max((Math.random() * 100), floor)),
                    data3: Math.floor(Math.max((Math.random() * 100), floor)),
                    data4: Math.floor(Math.max((Math.random() * 100), floor)),
                    data5: Math.floor(Math.max((Math.random() * 100), floor)),
                    data6: Math.floor(Math.max((Math.random() * 100), floor)),
                    data7: Math.floor(Math.max((Math.random() * 100), floor)),
                    data8: Math.floor(Math.max((Math.random() * 100), floor)),
                    data9: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };
        window.store1 = new Ext.data.JsonStore({
            fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
            data: generateData(5, 20)
        });

        var onRefreshTap = function() {
            window.store1.setData(generateData(5, 20));
        };


        var chart = {
            xtype: 'chart',
            flex: 1,
            animate: {
                easing: 'elasticIn',
                duration: 1000
            },
            store: store1,
            axes: [
                {
                    type: 'gauge',
                    position: 'gauge',
                    minimum: 0,
                    maximum: 100,
                    steps: 10,
                    margin: 10
                }
            ],
            series: [
                {
                    type: 'gauge',
                    field: 'data1',
                    donut: false,
                    colorSet: ['#F49D10', '#ddd']
                }
            ]
        };

        var chart2 = {
            xtype: 'chart',
            flex: 1,
            animate: true,
            store: store1,
            axes: [
                {
                    type: 'gauge',
                    position: 'gauge',
                    minimum: 0,
                    maximum: 100,
                    steps: 10,
                    margin: 7
                }
            ],
            series: [
                {
                    type: 'gauge',
                    field: 'data2',
                    donut: 30,
                    colorSet: ['#82B525', '#ddd']
                }
            ]
        };

        var chart3 = {
            xtype: 'chart',
            flex: 1,
            animate: true,
            store: store1,
            axes: [
                {
                    type: 'gauge',
                    position: 'gauge',
                    minimum: 0,
                    maximum: 100,
                    steps: 10,
                    margin: 7
                }
            ],
            series: [
                {
                    type: 'gauge',
                    field: 'data3',
                    donut: 55,
                    colorSet: ['#2582B5', '#ddd']
                }
            ]
        };

        var chart4 = {
            xtype: 'chart',
            flex: 1,
            animate: {
                easing: 'bounceOut',
                duration: 500
            },
            store: store1,
            axes: [
                {
                    type: 'gauge',
                    position: 'gauge',
                    minimum: 0,
                    maximum: 100,
                    steps: 10,
                    margin: 7
                }
            ],
            series: [
                {
                    type: 'gauge',
                    field: 'data4',
                    donut: 80,
                    colorSet: ['#3AA8CB', '#ddd']
                }
            ]
        };

        var panel = new Ext.Panel({
            fullscreen: true,
            ui: 'light',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    height: '2.6em',
                    docked: 'top',
                    xtype: 'toolbar',
                    ui: 'light',
                    title: 'Gauge Chart',
                    items: [
                        {
                            xtype: 'spacer'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'shuffle',
                            iconMask: true,
                            ui: 'plain',
                            handler: onRefreshTap
                        }
                    ]
                },
                {
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretchmax',
                        pack: 'center'
                    },
                    defaults: {
                        insetPadding: 25
                    },
                    items: [chart, chart2]
                },
                {
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    defaults: {
                        insetPadding: 25
                    },
                    items: [chart3, chart4]
                }
            ]
        });
    }
});

