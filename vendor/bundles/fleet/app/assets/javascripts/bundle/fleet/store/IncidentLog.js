Ext.define('Fleet.store.IncidentLog', {
	
	extend : 'Ext.data.Store',
	
	requires : 'Fleet.model.IncidentLog',
	
	model : 'Fleet.model.IncidentLog',
	
	autoLoad : false,

	remoteFilter : true,
	
	remoteSort : true,
	
	pageSize : 30,
	
	sorters : [ {
		property : 'created_at',
		direction : 'DESC'
	} ],
	
	proxy : {
		type : 'rest',
		url : 'incidents/:id/incident_logs',
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