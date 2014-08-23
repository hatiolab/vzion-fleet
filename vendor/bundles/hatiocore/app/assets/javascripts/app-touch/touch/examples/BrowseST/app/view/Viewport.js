Ext.define('BrowseST.view.Viewport', {
    extend: 'Ext.Panel',
    config: {
        fullscreen: true,
        layout: 'card',
        toolbar: {
            ui: 'dark',
            docked: 'top',
            title: 'Browse Sencha Touch'
        }
    },
    constructor: function(config){

        config.items = [];
        config.items.unshift(BrowseST.view.chartview);

        this.callParent([config]);
    },
    orient: function(orientation){
        
        if(orientation == 'portrait'){
            BrowseST.view.chartview.items.get(1).getSeries().items[0].orientation = 'vertical';
        }else{
            BrowseST.view.chartview.items.get(1).getSeries().items[0].orientation = 'horizontal';
        }
        this.callParent(arguments);
    },
    applyToolbar: function(toolbar, currentToolbarInstance){
        toolbar = Ext.factory(toolbar, 'Ext.Toolbar', currentToolbarInstance);
        return toolbar;
    },
    updateToolbar: function(toolbar, currentToolbarInstance){
        if(currentToolbarInstance){
            this.remove(currentToolbarInstance);
        }
        if(toolbar){
            this.add(toolbar);
        }
    }
});
