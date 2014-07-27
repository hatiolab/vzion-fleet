Ext.define('Fleet.model.SpotAlarmVehicle', {
	
	extend : 'Ext.data.Model',
  
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'spot_alarm_id', type : 'string'},
		{ name : 'spot_alarm', type : 'auto' },
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