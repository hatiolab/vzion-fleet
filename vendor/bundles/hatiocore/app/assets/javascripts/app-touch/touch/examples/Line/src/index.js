Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line'],
    onReady: function () {
        window.initExample('Line Chart', "Tapping a data point will bring up detailed information about it");

        window.createPanel(new Ext.chart.Chart({
            themeCls: 'line1',
            theme: 'Demo',
            store: store1,
            animate: true,
            legend: {
                position: 'right'
            },
            interactions: [
                {
                    type: 'panzoom',
                    axes: {
                        left: {}
                    }
                },
                {
                    type: 'iteminfo',
                    listeners: {
                        show: function (interaction, item, panel) {
                            var storeItem = item.storeItem;
                            panel.setHtml(['<ul><li><b>Month: </b>' + storeItem.get('name') + '</li>',
                                '<li><b>Value: </b> ' + item.value[1] + '</li></ul>'].join(''));
                        }
                    }
                }
            ],
            axes: [
                {
                    type: 'Numeric',
                    minimum: 0,
                    maximum: 100,
                    position: 'left',
                    fields: ['iphone', 'android', 'ipad'],
                    title: 'Number of Hits',
                    minorTickSteps: 1,
                    roundToDecimal: true,
                    decimals: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
                }
            ],
            series: [
                {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    fill: true,
                    smooth: true,
                    axis: 'left',
                    xField: 'name',
                    yField: 'iphone',
                    title: 'iPhone'
                },
                {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    smooth: true,
                    xField: 'name',
                    yField: 'android',
                    title: 'Android'
                },
                {
                    type: 'line',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    axis: 'left',
                    smooth: true,
                    xField: 'name',
                    yField: 'ipad',
                    title: 'iPad'
                }
            ]
        }));
    }
});
