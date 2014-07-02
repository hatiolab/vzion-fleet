Ext.define('Base.store.Calendar', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.Calendar',
	
	model : 'Base.model.Calendar',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : false,
	
	buffered : false,
		
	pageSize : 30,
	
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'calendars',
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