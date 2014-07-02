Ext.define('Base.store.Role', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.Role',
	
	model : 'Base.model.Role',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 1000,
	
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ],
	
  	proxy : {
		type : 'rest',
		url : 'roles',
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