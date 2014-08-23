Ext.define('EnergyApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: "#main",
            nav: '#navigation',
            navButton: '#navigationButton',
            chartView: '#chartView',
            viewport: '#viewport'
        },
        control: {
            nav: {
                leafitemtap: 'onNavTap'
            },
            navButton: {
                tap: 'showNav'
            },
            viewport: {
                orientationchange: 'onOrientationChange'
            }
        }
    },

    // TODO: remove this after control for 'viewport' is enabled.
    launch: function () {
        Ext.Viewport.onBefore('orientationchange', this.onOrientationChange, this);
        this.onOrientationChange(Ext.Viewport, Ext.Viewport.getOrientation());
    },

    showNav: function () {
        this.getMain().getSheet().show();
    },

    onNavTap: function (me, list, index, item) {
        var me = this,
            record = list.getStore().getAt(index),
            mainView = this.getMain(),
            chartView = this.getChartView(),
            type = record.parentNode.data.key,
            state = record.data.key;
        mainView.setActiveItem(chartView, 'slide');
        mainView.setTitle(record.label);
        mainView.setMasked({ msg: 'Loading...'});
        Ext.Ajax.request({
            url: 'app/data/' + type + "_" + state + ".json",
            success: function (response, opts) {
                try {
                    // decode responseText in order to create json object
                    var data = Ext.decode(response.responseText);
                    // load it into the charts store: this will update the area series
                    Ext.getStore('ChartStore').setData(data.items);
                    EnergyApp.loadPieAtYear();
                    // This should only run once? Doesn't seem to be a problem at the moment.
                } finally {
                    mainView.setMasked(false);
                }
            },
            failure: function (response) {
                mainView.setMasked({
                    msg: 'Failed loading!'
                });
            }
        });
    },

    onOrientationChange: function (viewport, orientation) {
        this.getMain().orientate(orientation);
    }
});