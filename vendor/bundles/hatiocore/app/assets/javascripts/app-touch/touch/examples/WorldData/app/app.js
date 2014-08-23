Ext.define("wd.models.WorldBankReader", {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.worldbank',
    type: 'json',
    config: {
        rootProperty: 'result'
    },
    constructor: function () {
        this.callParent(arguments);
    },
    readRecords: function (data) {
        if (data[1]) {
            return this.callParent([data[1]]);
        }
        return this.nullResultSet;
    }
});

Ext.application({
    name: 'wd',
    tabletStartupScreen: 'img/startup-tablet.jpg',
    phoneStartupScreen: 'img/startup-phone.jpg',
    tabletIcon: 'img/icon-ipad.png',
    phoneIcon: 'img/icon-iphone.png',
    glossOnIcon: false,

    stores: [
        'Curated',
        'Country',
        'Current',
        'Region',
        'Topic',
        'Indicator'],
    controllers: [
        'Main'
    ],
    views: [
        'Main',
        'Home',
        'Region',
        'Country',
        'Topic',
        'Indicator',
        'Data'
    ],
    launch: function () {
        Ext.Viewport.add([
            {xclass: 'wd.view.Main', hidden: true},
            {xclass: 'wd.view.InfoPanel'}
        ]);
        if (!location.hash) {
            this.redirectTo('home');
        }
    }
});

Ext.util.Format.si = function (number) {
    var number = parseFloat(number),
        suffix = ['', 'k', 'm', 'b', 't'],
        len = Math.round(Math.abs(number)).toString().length - 1;
    if (len < 15) {
        return (Math.round(number / Math.pow(10, len - 2)) / Math.pow(10, 2 - (len % 3))) + suffix[Math.floor(len / 3)];
    }
    return number.toString();
}