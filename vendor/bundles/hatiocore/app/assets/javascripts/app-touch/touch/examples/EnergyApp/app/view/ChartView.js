Ext.define("EnergyApp.view.ChartView", {
    extend: "Ext.tab.Panel",
    xtype: 'chartview',
    config: {
        tabBar: {
            docked: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        cardSwitchAnimation: {
            type: 'slide'
        },
        items: Ext.os.is.Phone ? [
            {xtype: 'area'},
            {xtype: 'line'}
        ] : [
            {xtype: 'area'},
            {xtype: 'line'},
            {xtype: 'year'}
        ]
    }
});