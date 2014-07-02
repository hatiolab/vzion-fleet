Ext.define('Base.store.SubCode', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Base.model.CommonCode',
	
	model : 'Base.model.SubCode',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	proxy: {
		type: 'rest',
		url : 'common_codes',
		format : 'json',
	    reader: {
			type: 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer: {
			type: 'json'
        }
	}
	
});