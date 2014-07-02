Ext.define('Fleet.store.VehicleTrace', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleTrace',
	
	model : 'Fleet.model.VehicleTrace',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'vehicle_id',
		direction : 'ASC'
	}, {
		property : 'trace_time',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'vehicle_traces',
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