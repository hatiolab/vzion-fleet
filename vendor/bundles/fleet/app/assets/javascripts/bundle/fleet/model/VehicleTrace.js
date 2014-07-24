Ext.define('Fleet.model.VehicleTrace', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'terminal_id', type : 'string' },
		{ name : 'terminal', type : 'auto' },
		{ name : 'vehicle_id', type : 'string' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver_id', type : 'string' },
		{ name : 'driver', type : 'auto' },
		{ name : 'lng', type : 'float' },
		{ name : 'lat', type : 'float' },
		{ name : 'velocity', type : 'float' },
		{ name : 'trace_time', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'vehicle_traces',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'vehicle_trace'
        }
	}
});