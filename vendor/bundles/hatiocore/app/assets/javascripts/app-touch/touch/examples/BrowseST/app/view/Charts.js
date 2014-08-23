var sunburstChart = {
    xtype: 'chart',
    title: 'Sunburst',
    animate: true,
    store: BrowseST.store.FileStore,
    interactions: [{
        type: 'itemhighlight'   
    }],
    series: [{
        type: 'sunburst',
        levelDistance: 80,
        highlight: true,
        listeners: {
            'itemtap': function(me, item, ev){
                var metadata = item.storeItem.getData(),
                    data = metadata.data;

                if(!metadata.leaf){
                    BrowseST.loadData({
                        directoryName: data['name'],
                        historyTitle: '../'+data['name']+'/',
                        dataSource: 'app/data/'+data['next']
                    }, true);
                }else{
                    BrowseST.fileInfo(data);
                }
            }
        },
        highlight: true,
        titleField: 'name',
        spanField: function(node){
            return 1;
        },
        areaField: function(node){
            if (node.data.data){
                return node.data.data['size'];
            } else {
                return 0;
            }
        },
        colorField: BrowseST.assignColor
    }]
}, 
icicleChart = {
    xtype: 'chart',
    animate: true,
    store: BrowseST.store.FileStore,
    interactions: [{
        type: 'itemhighlight'
    }],
    series: [{
        type: 'icicle',
        layout: 'icicle',
        orientation: 'horizontal',
        titleHeight: 20,
        offset: 0.5,
        highlight: true,
        rootName: 'BrowseST',
        titleField: 'name',
        listeners: {
            'itemtap': function(me, item, ev){
                var metadata = item.storeItem.getData(),
                    data = metadata.data;
            
                if(!metadata.leaf && item.storeItem.parentNode){
                    BrowseST.loadData({
                        directoryName: data['name'],
                        historyTitle: '../'+data['name']+'/',
                        dataSource: 'app/data/'+data['next']
                    }, true);
                }else if(item.storeItem.parentNode){
                    BrowseST.fileInfo(data);
                }
            }
        },
        lengthField: function(node){
            return 1;
        },
        areaField: function(node){
            if (node.data.data){
                return node.data.data['size'];
            } else {
                return 0;
            }
        },
        colorField: BrowseST.assignColor
    }]
};
