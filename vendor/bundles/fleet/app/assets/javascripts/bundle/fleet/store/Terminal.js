Ext.define('Fleet.store.Terminal', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Terminal',
	
	model : 'Fleet.model.Terminal',
	
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
		url : 'terminals',
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