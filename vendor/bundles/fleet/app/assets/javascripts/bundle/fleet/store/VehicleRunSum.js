Ext.define('Fleet.store.VehicleRunSum', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleRunSum',
	
	model : 'Fleet.model.VehicleRunSum',
	
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
		property : 'vehicle_id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'vehicle_run_sums',
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