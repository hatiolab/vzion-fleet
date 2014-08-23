window.initExample = function (title, helpText, defaultStore) {
    defaultStore = defaultStore || 'store1';
    window.generateData = function (n, floor) {
        var data = [],
            i;

        floor = (!floor && floor !== 0) ? 20 : floor;

        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Ext.Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                2003: Math.floor(Math.max((Math.random() * 100), floor)),
                2004: Math.floor(Math.max((Math.random() * 100), floor)),
                2005: Math.floor(Math.max((Math.random() * 100), floor)),
                2006: Math.floor(Math.max((Math.random() * 100), floor)),
                2007: Math.floor(Math.max((Math.random() * 100), floor)),
                2008: Math.floor(Math.max((Math.random() * 100), floor)),
                2009: Math.floor(Math.max((Math.random() * 100), floor)),
                2010: Math.floor(Math.max((Math.random() * 100), floor)),
                iphone: Math.floor(Math.max((Math.random() * 100), floor)),
                android: Math.floor(Math.max((Math.random() * 100), floor)),
                ipad: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    window.store1 = new Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data1', 'data2', 'data3', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', 'iphone', 'android', 'ipad'],
        data: generateData(5, 20)
    });
    window.store2 = new Ext.data.JsonStore({
        fields: ['name', '2008', '2009', '2010', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
        data: generateData(6, 20)
    });
    window.store3 = new Ext.data.JsonStore({
        fields: ['name', '2007', '2008', '2009', '2010'],
        data: generateData(12, 20)
    });
    var onRefreshTap = function () {
        window[defaultStore].setData(generateData(window[defaultStore].data.length, 20));
    };
    
    var onHelpTap = function () {
        window.helpPanel = window.helpPanel || Ext.create('Ext.Panel', {
            ui: 'dark',
            modal: true,
            fullscreen: false,
            hideOnMaskTap: true,
            centered: true,
            width: 300,
            height: 250,
            styleHtmlContent: true,
            scrollable: 'vertical',
            zIndex: 100,
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: title
                },
                {
                    html: helpText,
                    hidden: !helpText
                }
            ]
        });
        window.helpPanel.show('pop');
    }

    window.createPanel = function (chart) {
        return window.panel = Ext.create('Ext.chart.Panel', {
            fullscreen: true,
            title: title,
            buttons: [
                {
                    xtype: 'button',
                    iconCls: 'help',
                    iconMask: true,
                    ui: 'plain',
                    handler: onHelpTap
                },
                {
                    xtype: 'button',
                    iconCls: 'shuffle',
                    iconMask: true,
                    ui: 'plain',
                    handler: onRefreshTap
                }
            ],
            chart: chart
        });
    }
}
