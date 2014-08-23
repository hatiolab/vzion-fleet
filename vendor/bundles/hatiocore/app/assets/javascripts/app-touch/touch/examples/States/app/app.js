Ext.require(['Ext.Panel']);
Ext.application({
    name: 'StatesMVC',
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    launch: function(){
        StatesMVC.views.viewport = new StatesMVC.views.Viewport({title: '2010 Census Data'});
    }
});
Ext.ns('StatesMVC');
Ext.ns('StatesMVC.colorMap');