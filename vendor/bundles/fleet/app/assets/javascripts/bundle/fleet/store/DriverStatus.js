Ext.define('Fleet.store.DriverStatus', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.DriverStatus',
	
	model : 'Fleet.model.DriverStatus',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'driver_id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'driver_statuses',
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