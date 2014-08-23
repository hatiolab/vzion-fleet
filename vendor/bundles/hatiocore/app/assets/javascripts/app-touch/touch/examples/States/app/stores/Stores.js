Ext.ns('StatesMVC.stores');

StatesMVC.stores.pieStore = new Ext.data.JsonStore({
    fields: ['name', 'value']
});

StatesMVC.stores.pyramidStore = new Ext.data.JsonStore({
    fields: ['name', 'male', 'female']
});

StatesMVC.stores.barStore = new Ext.data.JsonStore({
    fields: ['name', 'population']
});