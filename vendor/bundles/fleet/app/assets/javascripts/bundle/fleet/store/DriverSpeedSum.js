Ext.define('Fleet.store.DriverSpeedSum', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.DriverSpeedSum',
	
	model : 'Fleet.model.DriverSpeedSum',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'driver_id',
		direction : 'ASC'
	}, {
		property : 'run_date',
		direction : 'DESC'
	} ],
		
	proxy : {
		type : 'rest',
		url : 'driver_speed_sums',
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