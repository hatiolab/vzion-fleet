Ext.define('Fleet.store.LocationAlarmVehicle', {
	
	requires : 'Fleet.model.LocationAlarmVehicle',
		
	extend : 'Ext.data.Store',
	
	model : 'Fleet.model.LocationAlarmVehicle',	
		
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	buffered : false,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'ajax',
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