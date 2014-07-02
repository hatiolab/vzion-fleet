Ext.define('Fleet.store.Consumable', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Consumable',
	
	model : 'Fleet.model.Consumable',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'consumables',
		format : 'json',
	    reader : {
			type : 'json',
			root : 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer : {
			type : 'json'
        }
	}
	
});