Ext.define("wd.store.Region", {
    extend: "Ext.data.Store",
    alias: 'store.region',
    config: {
        model: 'wd.model.Region',
        autoLoad: true,
        proxy: {
            type: 'scripttag',
            url: 'http://api.worldbank.org/region?format=jsonP',
            callbackKey: 'prefix',
            reader: {
                type: 'worldbank',
                rootProperty: 'result'
            }
        }
    }
});