Ext.Loader.setPath({
    'BrowseST': 'app'
});

BrowseST = {
    back: function(){
        var stack = BrowseST.viewStack,
            file;
            
        if(stack.length > 1){
            file = stack[stack.length-2];
            stack.pop();
            BrowseST.loadData(file, false);
        }
    },
    viewStack: [],
    visualizationMode: 0,
    colors: ['#C0F263','#A7ED1D','#8BC810'],
    assignColor: function(node){
        
        if(node && node.storeItem && node.storeItem.get('leaf')){
            return BrowseST.colors[0];
        }else{
            if(node && node.storeItem && !node.storeItem.get('leaf') && node.storeItem.childNodes.length > 0){
                return BrowseST.colors[2];
            }
            return BrowseST.colors[1];
        }
    },
    loadData: function(toLoad, stackLog){
       
        var chartView = BrowseST.view.chartview,
            fileStore = BrowseST.store.FileStore;

        fileStore = Ext.create('Ext.data.TreeStore', {
            model: 'File',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: toLoad.dataSource,
                reader: {
                    type: 'json'
                }
            }
        });
        
        chartView.items.get(0).bindStore(fileStore);
        chartView.items.get(1).bindStore(fileStore);
        chartView.items.get(1).getSeries().items[0].rootName = toLoad.directoryName;
        BrowseST.view.viewport.getToolbar().setTitle(toLoad.historyTitle); 
        
        fileStore.load({
            callback: function(){
                chartView.getActiveItem().refresh();
                if(stackLog){
                    BrowseST.viewStack.push(toLoad);
                }
            }
        });

    },
    fileInfo: function(data){
        // get kB instead of B and round to 1 decimal digit
        var sizeInKB = (((data['size']/1024)*10)>>0)/10;

        Ext.Msg.alert('File Information',
            'Filename: '+data['name']+'<br />Filesize: '+ (data['size']>1000?(sizeInKB+' kB'):(data['size']+' Byte'))+'<br />Filetype: '+data['fileType']);
    }
};
Ext.application({
    name: 'BrowseST',
    views: ['Viewport'],
    launch: function(){
        BrowseST.store.FileStore.load({
            callback: function(){
                BrowseST.viewStack.push({
                    directoryName: 'BrowseST',
                    historyTitle: 'BrowseST/',
                    dataSource: 'app/data/file-root.json'
                });

                var chartToolbar = Ext.create('Ext.Toolbar',{
                    docked: 'bottom',
                    items: [{
                        ui: 'back',
                        text: 'Return',
                        handler: BrowseST.back
                     },{
                        xtype: 'spacer'
                     }, {
                        text: 'Switch Mode',
                        handler: function(){
                            BrowseST.visualizationMode = BrowseST.visualizationMode?0:1;
                            BrowseST.view.chartview.setActiveItem(BrowseST.visualizationMode);
                       }
                     }]
                });

                BrowseST.view.chartview = Ext.create('Ext.Panel', {
                    ui: 'light',
                    cardSwitchAnimation: {
                        type: 'slide'
                    },
                    layout: 'card',
                    items: [sunburstChart, icicleChart],
                });
                BrowseST.view.chartview.add(chartToolbar);
                BrowseST.view.viewport = Ext.create('BrowseST.view.Viewport',{});
            }
        });
    }

});
