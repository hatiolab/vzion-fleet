Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Pie'],
    onReady: function () {
        window.initExample('Pie Chart',
            "This example's uses many interactions.<br><ul>" +
                "<li>Dragging the Pie Chart will rotate it.</li>" +
                "<li>Tap and hold will bring up additional information about a slice</li>" +
                "<li>Double-Tap will reset the chart back to the initial state (after confirmation)</li>");
        window.createPanel(new Ext.chart.Chart({
            themeCls: 'pie1',
            theme: 'Demo',
            store: store1,
            shadow: false,
            animate: true,
            insetPadding: 20,
            legend: {
                position: 'left'
            },
            interactions: [
                {
                    type: 'reset',
                    confirm: true
                },
                {
                    type: 'rotate'
                },
                'itemhighlight',
                {
                    type: 'iteminfo',
                    gesture: 'longpress',
                    listeners: {
                        show: function (interaction, item, panel) {
                            var storeItem = item.storeItem;
                            panel.setHtml(['<ul><li><b>Month: </b>' + storeItem.get('name') + '</li>', '<li><b>Value: </b> ' + storeItem.get('2007') + '</li></ul>'].join(''));
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'pie',
                    field: '2007',
                    showInLegend: true,
                    highlight: false,
                    listeners: {
                        'labelOverflow': function (label, item) {
                            item.useCallout = true;
                        }
                    },
                    // Example to return as soon as styling arrives for callouts
                    callouts: {
                        renderer: function (callout, storeItem) {
                            callout.label.setAttributes({
                                text: storeItem.get('name')
                            }, true);
                        },
                        filter: function () {
                            return false;
                        },
                        box: {
                            //no config here.
                        },
                        lines: {
                            'stroke-width': 2,
                            offsetFromViz: 20
                        },
                        label: {
                            font: 'italic 14px Arial'
                        },
                        styles: {
                            font: '14px Arial'
                        }
                    },
                    label: {
                        field: 'name'
                    }
                }
            ]
        }));
    }
});
