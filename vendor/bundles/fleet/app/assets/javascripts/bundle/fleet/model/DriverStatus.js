Ext.define('Fleet.model.DriverStatus', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'driver', type : 'auto' },
		{ name : 'status', type : 'string' },
		{ name : 'total_dist', type : 'float' },
		{ name : 'total_runtime', type : 'float' },
		{ name : 'avg_effcc', type : 'float' },
		{ name : 'eco_index', type : 'integer' },
		{ name : 'eco_run_rate', type : 'integer' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'driver_statuses',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'driver_status'
        }
	}
});