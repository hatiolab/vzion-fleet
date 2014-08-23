Ext.define("wd.view.Region", {
    extend: "Ext.List",
    depth: [1, 0],
    config: {
        id: 'regionList',
        store: 'Region',
        itemTpl: '{name}'
    }
});