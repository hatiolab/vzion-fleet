Ext.define('Fleet.model.LocationAlarmVehicle', {
	
	extend : 'Ext.data.Model',
  
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'location_alarm_id', type : 'string'},
		{ name : 'alarm_name', type : 'string' },
		{ name : '_cud_flag_', type : 'string' }
	],	
	
	proxy : {
		type : 'rest',
		url : 'vehicles',
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