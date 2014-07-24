Ext.define('Fleet.store.Task', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Task',
	
	model : 'Fleet.model.Task',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	proxy : {
		type : 'rest',
		url : 'tasks',
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