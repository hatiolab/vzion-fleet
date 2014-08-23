Ext.Loader.setPath({
    'EnergyApp': 'app'
});

Ext.application({
    name: 'EnergyApp',
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,

    views: [
        'AreaChart',
        'LineChart',
        'YearChart',
        'Navigation',
        'Main'
    ],
    
    stores: ['ChartStore', 'YearStore', 'NavigationStore'],
    controllers: ['Main'],
    launch: function () {
        Ext.create("EnergyApp.view.Main", {title: 'US Energy Data Visualization'});
    }
});

EnergyApp = {
    commify: function (nStr) {
        return(nStr / 1000000).toFixed(2);
    },

    loadPieAtYear: function (year) {
        EnergyApp.currentYear = year = year || EnergyApp.currentYear || 2009;
        var store = Ext.getStore("ChartStore"),
            record = store.getAt(store.find('year', year));
        Ext.getStore("YearStore").setData([
            {type: 'Coal', data: record.get('coal')},
            {type: 'Oil', data: record.get('crude-oil')},
            {type: 'Natural Gas', data: record.get('gas')},
            {type: 'Nuclear', data: record.get('nuclear')},
            {type: 'Renewable', data: record.get('renewable')}
        ]);
    },

    popup: function (item, panel) {
        var storeItem = item.storeItem,
            commify = EnergyApp.commify;
        panel.setHtml([
            '<ul><li><b>Year: </b>' + storeItem.get('year') + '</li>',
            '<li><b>Coal: </b> ' + commify(storeItem.get('coal')) + '</li>',
            '<li><b>Oil: </b> ' + commify(storeItem.get('crude-oil')) + '</li>',
            '<li><b>Natural Gas: </b> ' + commify(storeItem.get('gas')) + '</li>',
            '<li><b>Nuclear: </b> ' + commify(storeItem.get('nuclear')) + '</li>',
            '<li><b>Renewable: </b> ' + commify(storeItem.get('renewable')) + '</li>',
            '</ul>'
        ].join(''));
    },

    popupYear: function (item, panel) {
        var storeItem = item.storeItem,
            commify = EnergyApp.commify;
        panel.setHtml([
            '<ul><li><b>Type: </b>' + storeItem.get('type') + '</li>',
            '<li><b>BTUs: </b> ' + commify(storeItem.get('data')) + '</li>',
            '</ul>'
        ].join(''));
    }
};