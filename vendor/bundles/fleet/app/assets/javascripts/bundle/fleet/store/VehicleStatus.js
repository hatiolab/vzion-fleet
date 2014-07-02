Ext.define('Fleet.store.VehicleStatus', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleStatus',
	
	model : 'Fleet.model.VehicleStatus',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'vehicle_id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
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