Ext.define('Fleet.store.Incident', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Incident',
	
	model : 'Fleet.model.Incident',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'updated_at',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'incidents',
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