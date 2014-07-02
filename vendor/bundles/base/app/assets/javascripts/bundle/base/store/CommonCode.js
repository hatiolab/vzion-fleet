Ext.define('Base.store.CommonCode', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.CommonCode',
	
	model : 'Base.model.CommonCode',
	
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
		url : 'common_codes',
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
