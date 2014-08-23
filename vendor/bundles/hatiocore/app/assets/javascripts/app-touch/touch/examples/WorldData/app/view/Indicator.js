Ext.define("wd.view.Indicator", {
    extend: "Ext.List",
    depth: [0, 2],
    config: {
        id: 'indicatorList',
        store: 'Indicator',
        itemTpl: '{name}'
    }
});