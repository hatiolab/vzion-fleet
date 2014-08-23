Ext.ns('BrowseST.store');

BrowseST.store.FileStore = Ext.create('Ext.data.TreeStore', {
    model: 'File',
    batchUpdateMode: 'complete',
    proxy: {
        type: 'ajax',
        url: 'app/data/file-root.json',
        reader: {
            type: 'json',
            rootProperty: 'children'
       }
    }
});
