Ext.define('Fleet.store.DriversByGroup', {
	
	requires : 'Fleet.model.DriversByGroup',
		
	extend : 'Ext.data.Store',
	
	model : 'Fleet.model.DriversByGroup',	
		
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
		url : 'driver_groups',
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