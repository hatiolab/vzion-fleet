Ext.define('Base.store.User', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.User',
	
	model : 'Base.model.User',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 100,
	
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	} ],	
	
  	proxy : {
		type : 'rest',
		url : 'users',
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