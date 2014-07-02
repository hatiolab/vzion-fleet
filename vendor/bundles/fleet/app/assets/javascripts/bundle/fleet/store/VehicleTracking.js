Ext.define('Fleet.store.VehicleTracking', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleTrace',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'vehicle', type : 'auto' },
		{ name : 'driver', type : 'auto' },
		{ name : 'terminal', type : 'auto' },
		{ name : 'status', type : 'string' },
		{ name : 'lat', type : 'float' },
		{ name : 'lng', type : 'float' },
		{ name : 'total_dist', type : 'integer' },
		{ name : 'total_runtime', type : 'integer' }
	],
	
	proxy : {
		type : 'ajax',
		url : 'vehicle_statuses',
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