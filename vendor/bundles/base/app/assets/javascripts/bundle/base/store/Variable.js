Ext.define('Base.store.Variable', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.Variable',
	
	model : 'Base.model.Variable',
	
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
		url : 'variables',
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