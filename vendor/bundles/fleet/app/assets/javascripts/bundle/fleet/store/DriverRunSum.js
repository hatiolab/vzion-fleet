Ext.define('Fleet.store.DriverRunSum', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.DriverRunSum',
	
	model : 'Fleet.model.DriverRunSum',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'run_year',
		direction : 'DESC'
	}, {
		property : 'run_month',
		direction : 'DESC'
	}, {
		property : 'driver_id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'driver_run_sums',
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