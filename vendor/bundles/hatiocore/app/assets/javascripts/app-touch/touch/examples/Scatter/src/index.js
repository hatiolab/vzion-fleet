Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Scatter',
        'Ext.draw.engine.ImageExporter'],
    onReady: function () {
        window.initExample('Scatter Chart', "Tapping a data point will bring up detailed information about it");

        window.createPanel(new Ext.chart.Chart({
            themeCls: 'scatter1',
            theme: 'Demo',
            animate: true,
            // shadow: true,
            store: store1,
            maxGutter: [30, 30],
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data1', 'data2', 'data3'],
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
                    type: 'scatter',
                    markerConfig: {},
                    axis: ['left', 'bottom'],
                    xField: 'name',
                    yField: 'data1'
                },
                {
                    type: 'scatter',
                    markerConfig: {},
                    axis: ['left', 'bottom'],
                    xField: 'name',
                    yField: 'data2'
                },
                {
                    type: 'scatter',
                    markerConfig: {},
                    axis: ['left', 'bottom'],
                    xField: 'name',
                    yField: 'data3'
                }
            ]
        }));
    }
});
