Ext.define('Base.store.Code', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.CommonCode',
	
	model : 'Base.model.CommonCode',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 1000,
	
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ],	
	
	proxy : {
		type : 'rest',
		url : 'common_codes/show_by_name',
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