Ext.define('Fleet.store.VehicleSpeedSum', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleSpeedSum',
	
	model : 'Fleet.model.VehicleSpeedSum',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'vehicle_id',
		direction : 'ASC'
	}, {
		property : 'run_date',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'vehicle_speed_sums',
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