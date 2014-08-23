Ext.define("wd.view.Country", {
    extend: "Ext.List",
    depth: [2, 0],
    config: {
        id: 'countryList',
        store: 'Country',
        itemTpl: '{name}'
    }
});