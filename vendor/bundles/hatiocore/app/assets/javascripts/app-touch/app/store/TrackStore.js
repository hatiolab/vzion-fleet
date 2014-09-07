Ext.define('FleetTouch.store.TrackStore', {
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,
		
		remoteFilter : true,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'terminal_id',
			type : 'string'
		}, {
			name : 'vehicle_id',
			type : 'string'
		}, {
			name : 'driver_id',
			type : 'string'
		}, {
			name : 'lat',
			type : 'number'
		}, {
			name : 'lng',
			type : 'number'
		}, {
			name : 'trace_time',
			type : 'date'
		}, {
			name : 'velocity',
			type : 'float'
		} ],

		sorters : [ {
			property : 'trace_time',
			direction : 'DESC'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/vehicle_traces' : 'assets/app-touch/data/track.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}
	}
});