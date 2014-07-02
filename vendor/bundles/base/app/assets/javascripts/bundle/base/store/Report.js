Ext.define('Base.store.Report', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.Report',
	
	model : 'Base.model.Report',
	
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
		url : 'reports',
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