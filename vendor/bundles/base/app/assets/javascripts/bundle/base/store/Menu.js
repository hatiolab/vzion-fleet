Ext.define('Base.store.Menu', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.Menu',
	
	model : 'Base.model.Menu',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : true,
	
	buffered : false,
	
	pageSize : 30,
	
	proxy : {
		type : 'rest',
		url : 'menus',
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
	},
	
	sorters : [ {
		property: 'rank',
		direction: 'ASC'
	} ]
});