Ext.define('Fleet.model.Incident', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'domain_id', type : 'integer' },
		{ name : 'terminal_id', type : 'integer' },
		{ name : 'terminal', type : 'auto' },
		{ name : 'vehicle_id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'driver', type : 'auto' },
		{ name : 'lat', type : 'float' },
		{ name : 'lng', type : 'float' },
		{ name : 'velocity', type : 'float' },
		{ name : 'impulse_x', type : 'float' },
		{ name : 'impulse_y', type : 'float' },
		{ name : 'impulse_z', type : 'float' },
		{ name : 'impulse_abs', type : 'float' },
		{ name : 'impulse_threshold', type : 'float' },
		{ name : 'engine_temp', type : 'float' },
		{ name : 'engine_temp_threshold', type : 'float' },
		{ name : 'obd_connected', type : 'boolean' },
		{ name : 'confirm', type : 'boolean' },
		{ name : 'video_clip', type : 'string' },
		{ name : 'creator_id', type : 'integer' },
		{ name : 'updater_id', type : 'integer' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'incidents',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'incident'
        }
	}
});