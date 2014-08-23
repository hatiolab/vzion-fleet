Ext.define('FleetTouch.store.VehicleSummaryStore', {
	
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,
		
		remoteFilter : true,

		pageSize : 1,

		fields : [ {
			name : 'vehicle',
			type : 'auto'
		}, {
			name : 'consumables',
			type : 'auto'
		}, {
			name : 'maint',
			type : 'auto'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/vehicles/summary' : 'assets/app-touch/data/vehicle_summary.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total',
				successProperty : 'success'
			}
		}
	}

});