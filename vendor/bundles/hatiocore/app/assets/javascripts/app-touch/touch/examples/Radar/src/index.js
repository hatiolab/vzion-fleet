Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function () {
        window.initExample('Radar Chart',
            "This example's uses two interactions.<br><ul>" +
                "<li>Dragging the Radar Chart will rotate it.</li>" +
                "<li>Double-Tap will reset the chart back to the initial state (no confirmation)</li>" +
                "</ul>",
            'store3'
        );

        window.createPanel(new Ext.chart.Chart({
            themeCls: 'radar1',
            theme: 'Demo',
            insetPadding: 30,
            shadow: true,
            animate: true,
            store: store3,
            interactions: ['rotate', 'reset'],
            legend: {
                position: 'right',
                labelFont: '17px Helvetica, Arial, sans-serif' // To be moved to SCSS
            },
            axes: [
                {
                    type: 'Radial',
                    position: 'radial',
                    label: {
                        display: true
                    }
                }
            ],
            series: [
                {
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2007',
                    label: {
                        field: 2007,
                        display: 'rotate'
                    }
                },
                {
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2008'
                },
                {
                    showInLegend: true,
                    type: 'radar',
                    xField: 'name',
                    yField: '2009'
                }
            ]
        }));
    }
});
