Ext.define('Fleet.store.Driver', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Driver',
	
	model : 'Fleet.model.Driver',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	proxy : {
		type : 'rest',
		url : 'drivers',
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