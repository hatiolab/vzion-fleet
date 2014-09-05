Ext.define('Fleet.store.Repair', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.Repair',
	
	model : 'Fleet.model.Repair',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'created_at',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'repairs',
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