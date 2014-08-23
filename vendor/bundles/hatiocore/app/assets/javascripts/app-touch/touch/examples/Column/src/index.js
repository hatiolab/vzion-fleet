Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Column'],
    onReady: function () {
        window.initExample('Column Chart', "<p>This example's uses custom styling to make each data point use a different gradient color.</p>" +
            "<p>The chart can be zoomed horizontally with a pinch gesture, and the panned by dragging.  </p>" +
            "<p>For devices which do not support multi-touch, an extra toggle button is made available to switch between pan and zoom.  </p>" +
            "<p>When zoomed in, arrow indicators will be overlayed on the chart to show that more data is available </p>");
        window.createPanel(new Ext.chart.Chart({
            themeCls: 'column1',
            animate: {
                easing: 'bounceOut',
                duration: 750
            },
            store: store1,
            shadow: false,
            gradients: [
                {
                    'id': 'v-1',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(212, 40, 40)'
                        },
                        100: {
                            color: 'rgb(117, 14, 14)'
                        }
                    }
                },
                {
                    'id': 'v-2',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(180, 216, 42)'
                        },
                        100: {
                            color: 'rgb(94, 114, 13)'
                        }
                    }
                },
                {
                    'id': 'v-3',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(43, 221, 115)'
                        },
                        100: {
                            color: 'rgb(14, 117, 56)'
                        }
                    }
                },
                {
                    'id': 'v-4',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(45, 117, 226)'
                        },
                        100: {
                            color: 'rgb(14, 56, 117)'
                        }
                    }
                },
                {
                    'id': 'v-5',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(187, 45, 222)'
                        },
                        100: {
                            color: 'rgb(85, 10, 103)'
                        }
                    }
                }
            ],
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['2009'],
                    minimum: 0,
                    maximum: 100,
                    label: {
                        renderer: function (v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Number of Hits'
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
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    renderer: function (sprite, storeItem, barAttr, i, store) {
                        barAttr.fill = "url(#v-" + (i % colors.length + 1) + ")";
                        return barAttr;
                    },
                    label: {
                        field: '2009'
                    },
                    xField: 'name',
                    yField: '2009'
                }
            ],
            interactions: [
                {
                    type: 'panzoom',
                    axes: ['bottom']
                }
            ]
        }));
    }
});
