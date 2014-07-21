Ext.define('Fleet.store.VehicleRepair', {
	
	requires : 'Fleet.model.VehicleRepair',
		
	extend : 'Ext.data.Store',
	
	model : 'Fleet.model.VehicleRepair',	
		
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
		url : 'vehicles',
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