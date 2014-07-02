Ext.define('Fleet.store.VehicleConsumable', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.VehicleConsumable',
	
	model : 'Fleet.model.VehicleConsumable',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'vehicle_id',
		direction : 'ASC'
	}, {
		property : 'name',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'vehicle_consumables',
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