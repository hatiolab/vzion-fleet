Ext.define("wd.store.Indicator", {
    extend: "Ext.data.Store",
    alias: "store.indicator",
    config: {
        model: "wd.model.Indicator",
        pageSize: 300,
        proxy: {
            type: "scripttag",
            callbackKey: "prefix",
            limitParam: "per_page",
            reader: {
                type: "worldbank",
                rootProperty: "result"
            }
        }
    }
});