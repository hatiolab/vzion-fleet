Ext.define('Fleet.model.VehicleStatus', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'vehicle_id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'driver', type : 'auto' },
		{ name : 'terminal_id', type : 'integer' },
		{ name : 'terminal', type : 'auto' },
		{ name : 'status', type : 'string' },
		{ name : 'health_status', type : 'string' },
		{ name : 'total_dist', type : 'float' },
		{ name : 'total_runtime', type : 'float' },
		{ name : 'remain_fuel', type : 'float' },
		{ name : 'official_effcc', type : 'float' },
		{ name : 'avg_effcc', type : 'float' },
		{ name : 'eco_index', type : 'integer' },
		{ name : 'eco_run_rate', type : 'integer' },
		{ name : 'lat', type : 'float' },
		{ name : 'lng', type : 'float' },
		{ name : 'creator_id', type : 'integer' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'integer' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
	validations : [
		{ type : 'presence',  field : 'vehicle_id' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'vehicle_statuses',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle_status'
        }
	}
});