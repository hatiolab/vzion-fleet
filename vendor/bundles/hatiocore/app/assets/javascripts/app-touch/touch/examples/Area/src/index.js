Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Area',
        'Ext.draw.engine.ImageExporter'],
    onReady: function() {
        window.initExample('Area Chart', "This example's legend position <br/>" +
            "is configured to be conditional<br/>" +
            "based on the orientation of the device.");
        window.createPanel(Ext.create('Ext.chart.Chart', {
            themeCls: 'area1',
            theme: 'Demo',
            store: window.store1,
            animate: true,
            legend: {
                position: {
                    portrait: 'right',
                    landscape: 'bottom'
                },
                labelFont: '20px Arial'
            },
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['2003', '2004', '2005', '2006', '2007', '2008', '2009'],
                    title: 'Number of Hits',
                    minimum: 0,
                    adjustMinimumByMajorUnit: 0
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
                    type: 'area',
                    highlight: false,
                    axis: 'left',
                    xField: 'name',
                    yField: ['2003', '2004', '2005', '2006', '2007', '2008', '2009']
                }
            ]
        }));
    }
});
