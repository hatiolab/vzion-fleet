Ext.define('Fleet.model.IncidentLog', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'domain_id', type : 'integer' },
		{ name : 'incident_id', type : 'integer' },
		{ name : 'terminal_id', type : 'integer' },
		{ name : 'vehicle_id', type : 'integer' },
		{ name : 'driver_id', type : 'integer' },
		{ name : 'lat', type : 'float' },
		{ name : 'lng', type : 'float' },
		{ name : 'velocity', type : 'integer' },
		{ name : 'accel_x', type : 'float' },
		{ name : 'accel_y', type : 'float' },
		{ name : 'accel_z', type : 'float' },
		{ name : 'created_at', type : 'date' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'incidents/:id/incident_logs',
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