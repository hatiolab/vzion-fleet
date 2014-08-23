Ext.define("wd.store.Country", {
    extend: "Ext.data.Store",
    alias: "store.country",
    config: {
        model: "wd.model.Country",
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
})