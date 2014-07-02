Ext.define('Base.store.Attachment', {
	
	extend : 'Ext.data.Store',
	
	model : 'Base.model.Attachment',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'created_at',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'attachments',
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