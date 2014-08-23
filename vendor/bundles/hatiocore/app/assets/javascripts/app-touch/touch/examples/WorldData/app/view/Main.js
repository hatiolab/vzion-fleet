Ext.define("wd.view.Main", {
    extend: "Ext.Panel",
    config: {
        id: 'main',
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'right'
            }
        },
        hidden: true,
        items: [
            {
                xtype: 'toolbar',
                docked: "top",
                title: '',
                items: [
                    {
                        id: 'backButton',
                        ui: 'back',
                        text: 'Regions',
                        hidden: true,
                        zIndex: 10,
                    },
                    {xtype: 'spacer'},
                    {
                        iconCls: 'info',
                        iconMask: true,
                        ui: 'plain',
                        listeners: {
                            tap: function () {
                                Ext.Msg.alert("Attribution", "The datasets displayed in this application come from <a href='http://worldbank.org/'>The World Bank</a>, via its JSONP API.");
                            }
                        }
                    }
                ]
            },
            {xclass: 'wd.view.Home'},
            {xclass: 'wd.view.Region'},
            {xclass: 'wd.view.Country'},
            {xclass: 'wd.view.Topic'},
            {xclass: 'wd.view.Indicator'},
            {xclass: 'wd.view.Data'}
        ]
    }
});