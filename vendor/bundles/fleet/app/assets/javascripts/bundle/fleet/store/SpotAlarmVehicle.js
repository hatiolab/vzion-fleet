Ext.define('Fleet.store.SpotAlarmVehicle', {
	
	requires : 'Fleet.model.SpotAlarmVehicle',
		
	extend : 'Ext.data.Store',
	
	model : 'Fleet.model.SpotAlarmVehicle',	
		
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
		url : 'spot_alarms',
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