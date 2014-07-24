Ext.define('Fleet.model.IncidentLog', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'incident_id', type : 'string' },
		{ name : 'terminal_id', type : 'string' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'driver_id', type : 'string' },
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