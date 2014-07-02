Ext.define('Base.store.CalendarDate', {
	
	extend : 'Ext.data.Store',
	
	model : 'Base.model.CalendarDate',
	
	autoLoad : false,
	
	remoteFilter : false,
	
	remoteSort : false,
	
	pageSize : 100,
	
	proxy: {
		type: 'rest',
		url : 'calendar_dates',
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