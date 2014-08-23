Ext.define("wd.view.Home", {
    extend: "Ext.Panel",
    depth: [0, 0],
    config: {
        id: 'homeCard',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: 'Data by region',
                        flex: 1,
                        action: 'byRegion'
                    },
                    {
                        xtype: 'button',
                        text: 'Data by indicator',
                        flex: 1,
                        action: 'byIndicator'
                    }
                ]
            },
            {
                xtype: 'list',
                store: "Curated",
                itemTpl: '{alias}'
            }
        ]
    }
});