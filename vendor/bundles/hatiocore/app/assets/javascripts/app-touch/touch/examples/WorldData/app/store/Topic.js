Ext.define("wd.store.Topic", {
    extend: "Ext.data.Store",
    alias: 'store.topics',
    config: {
        model: 'wd.model.Topic',
        autoLoad: true,
        proxy: {
            type: 'scripttag',
            url: 'http://api.worldbank.org/topics?format=jsonP',
            callbackKey: 'prefix',
            reader: {
                type: 'worldbank',
                rootProperty: 'result'
            }
        }
    }
});