Ext.define('Base.store.Entity', {

	extend : 'Ext.data.Store',

	requires : 'Base.model.Entity',

	model : 'Base.model.Entity',

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
		url : 'entities',
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