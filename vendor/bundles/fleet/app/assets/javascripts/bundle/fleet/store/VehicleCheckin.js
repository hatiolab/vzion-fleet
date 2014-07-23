Ext.define('Fleet.store.VehicleCheckin', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleCheckin',
	
	model : 'Fleet.model.VehicleCheckin',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'start_time',
		direction : 'DESC'
	}, {
		property : 'run_date',
		direction : 'DESC'
	}, {
		property : 'vehicle_id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'vehicle_checkins',
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