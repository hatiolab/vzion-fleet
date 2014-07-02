Ext.define('Base.store.RemTrace', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Base.model.RemTrace',
	
	model : 'Base.model.RemTrace',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	proxy : {
		type : 'rest',
		url : 'rem_traces',
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