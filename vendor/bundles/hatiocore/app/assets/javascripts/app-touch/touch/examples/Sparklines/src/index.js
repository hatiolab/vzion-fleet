Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        window.generateData = function(n, floor) {
            var data = [],
                p = (Math.random() *  11) + 1,
                i;

            floor = 10;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Ext.Date.monthNames[i % 12],
                    glucose: Math.floor(Math.max((Math.random() * 100), floor)),
                    respiration: Math.floor(Math.max((Math.random() * 100), floor)),
                    temperature: Math.floor(Math.max((Math.random() * 100), floor)),
                    WBC: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };

        var store1 = new Ext.data.JsonStore({
            fields: ['name', 'glucose', 'respiration', 'temperature', 'WBC'],
            data: generateData(10, 10)
        });

        var chart = new Ext.chart.Spark({
            store: store1,
            renderTo: 'glucose-chart',
            series: [{
                type: 'line',
                xField: 'name',
                yField: 'glucose',
                fill: true,
                style: {
                    fill: '#777'
                }
            }]
        });

        chart.redraw();

        chart = new Ext.chart.Spark({
            store: store1,
            renderTo: 'respiration-chart',
            series: [{
                type: 'line',
                xField: 'name',
                yField: 'respiration',
                style: {
                    fill: '#777'
                }
            }]
        });

        chart.redraw();
        
        chart = new Ext.chart.Spark({
            store: store1,
            renderTo: 'temperature-chart',
            series: [{
                type: 'column',
                xField: 'name',
                yField: 'temperature'
            }]
        });

        chart.redraw();

        chart = new Ext.chart.Spark({
            store: store1,
            renderTo: 'WBC-chart',
            series: [{
                type: 'area',
                xField: 'name',
                yField: 'WBC'
            }]
        });

        chart.redraw();
    }
});
