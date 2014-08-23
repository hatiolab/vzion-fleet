Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Area'],
    onReady: function () {
        window.initExample('Bar Chart', "This example's uses many interactions.<br><ul>" +
            "<li>A horizontal swipe will change between a grouped and stacked bar chart.</li>" +
            "<li>Tapping two items will overlay an arrow and show a comparison in the Title area.</li>" +
            "<li>The chart can be zoomed vertically with a pinch gesture, and the panned by dragging.  For devices which do not support multi-touch, an extra toggle button is made available to switch between pan and zoom.  When zoomed in, arrow indicators will be overlayed on the chart to show that more data is available</li>" +
            "<li>Double-Tap will reset the chart back to the initial state</li>");
        var chartPanel = window.createPanel(Ext.create('Ext.chart.Chart', {
            layout: 'auto',
            themeCls: 'bar1',
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
                    type: 'reset'
                },
                {
                    type: 'togglestacked'
                },
                {
                    type: 'panzoom',
                    axes: {
                        left: {}
                    }
                },
                'itemhighlight',
                {
                    type: 'iteminfo',
                    gesture: 'longpress',
                    panel: {
                        items: [
                            {
                                docked: 'top',
                                xtype: 'toolbar',
                                title: 'Details'
                            }
                        ]
                    },
                    listeners: {
                        'show': function (me, item, panel) {
                            panel.setHtml('<ul><li><b>Month:</b> ' + item.value[0] + '</li><li><b>Value: </b> ' + item.value[1] + '</li></ul>');
                        }
                    }
                },
                {
                    type: 'itemcompare',
                    offset: {
                        x: -10
                    },
                    listeners: {
                        'show': function (interaction) {
                            var val1 = interaction.item1.value,
                                val2 = interaction.item2.value;

                            chartPanel.descriptionPanel.setTitle(val1[0] + ' to ' + val2[0] + ' : ' + Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%');
                            chartPanel.headerPanel.getLayout().setAnimation('slide');
                            chartPanel.headerPanel.setActiveItem(1);
                        },
                        'hide': function () {
                            var animation = chartPanel.headerPanel.getLayout().getAnimation();
                            if (animation) {
                                animation.setReverse(true);
                            }
                            chartPanel.headerPanel.setActiveItem(0);
                        }
                    }
                }
            ],
            axes: [
                {
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['2008', '2009', '2010'],
                    label: {
                        renderer: function (v) {
                            return v.toFixed(0);
                        }
                    },
                    title: 'Number of Hits',
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month of the Year'
                }
            ],
            series: [
                {
                    type: 'bar',
                    xField: 'name',
                    yField: ['2008', '2009', '2010'],
                    axis: 'bottom',
                    highlight: true,
                    showInLegend: true
                }
            ]
        }));
    }
});
