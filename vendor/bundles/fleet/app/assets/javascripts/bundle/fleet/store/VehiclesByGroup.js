Ext.define('Fleet.store.VehiclesByGroup', {
	
	requires : 'Fleet.model.VehiclesByGroup',
		
	extend : 'Ext.data.Store',
	
	model : 'Fleet.model.VehiclesByGroup',
		
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	buffered : false,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	} ],
	
	proxy : {
		type : 'ajax',
		url : 'vehicle_groups',
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