Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
            'Ext.chart.axis.Numeric',
            'Ext.chart.axis.Time',
            'Ext.chart.series.Line',
            'Ext.draw.engine.ImageExporter'],
    onReady: function() {

        function generateData() {
            var today = new Date(),
                before = Ext.Date.add(today, Ext.Date.DAY, -200),
                data = [
                    {
                        date: before,
                        num: 0,
                        djia: 10000,
                        sp500: 1100
                    }
                ],
                i, currentDate = before;

            for (i = 1; i < 100; i++) {
                data.push({
                    date: (currentDate = Ext.Date.add(currentDate, Ext.Date.DAY, 1)),
                    num: i,
                    sp500: data[i - 1].sp500 + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7),
                    djia: data[i - 1].djia + ((Math.floor(Math.random() * 2) % 2) ? -1 : 1) * Math.floor(Math.random() * 7)
                });
            }
            return data;
        }

        var store1 = new Ext.create('Ext.data.JsonStore', {
            fields: ['date', 'num', 'sp500', 'djia'],
            data: generateData()
        });

        store1.setData(generateData());

        var onRefreshTap = function() {
            store1.setData(generateData());
        };

        var chart = new Ext.chart.Chart({
                themeCls: 'stock1',
                theme: 'Demo',
                store: store1,
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'bottom',
                        landscape: 'right'
                    },
                    labelFont: '17px Arial'
                },
                interactions: [
                    {
                        type: 'panzoom',
                        axes: {
                            left: {
                                maxZoom: 2
                            },
                            bottom: {
                                maxZoom: 4
                            },
                            right: {
                                minZoom: 0.5,
                                maxZoom: 4,
                                allowPan: false
                            }
                        }
                    }
                ],
                animate: false,
                store: store1,
                axes: [
                    {
                        type: 'Numeric',
                        position: 'left',
                        fields: ['djia'],
                        title: 'Dow Jones Average'
                    },
                    {
                        type: 'Numeric',
                        position: 'right',
                        fields: ['sp500'],
                        title: 'S&P 500'
                    },
                    {
                        type: 'Time',
                        position: 'bottom',
                        fields: ['date'],
                        dateFormat: ' M d ',
                        label: {
                            rotate: {
                                degrees: 45
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'line',
                        showMarkers: false,
                        smooth: true,
                        axis: ['bottom', 'left'],
                        xField: 'date',
                        yField: 'djia'
                    },
                    {
                        type: 'line',
                        showMarkers: false,
                        fill: true,
                        axis: ['bottom', 'right'],
                        xField: 'date',
                        yField: 'sp500'
                    }
                ]
            });
        Ext.create('Ext.chart.Panel', {
            //id: 'chartCmp',
            title: 'Stock Example',
            fullscreen: true,
            renderTo: Ext.getBody(),
            buttons : [{
                xtype: 'button',
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap
            }],
            chart : chart
        });
    }});
