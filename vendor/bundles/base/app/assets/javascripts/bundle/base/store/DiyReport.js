Ext.define('Base.store.DiyReport', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.DiyReport',
	
	model : 'Base.model.DiyReport',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : true,
	
	buffered : false,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ],	
	
	proxy : {
		type : 'rest',
		url : 'diy_reports',
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