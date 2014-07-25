Ext.define('Fleet.store.LocationAlarm', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.LocationAlarm',
	
	model : 'Fleet.model.LocationAlarm',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	proxy : {
		type : 'rest',
		url : 'location_alarms',
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