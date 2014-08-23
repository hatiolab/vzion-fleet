Ext.define('FleetTouch.store.VehicleMapStore', {
	
	extend : 'Ext.data.Store',

	config : {
		pageSize : 1000,

		autoLoad : false,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'status',
			type : 'string'
		}, {
			name : 'driver_id',
			type : 'string'
		}, {
			name : 'lat',
			type : 'float'
		}, {
			name : 'lng',
			type : 'float'
		}, {
			name : 'location',
			type : 'string'
		}, {
			name : 'image_clip',
			type : 'string'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? 'vehicle_statuses/locations' : 'assets/app-touch/data/vehicle_brief.json',
			extraParams : {
				select : [ 'id', 'name', 'description', 'status', 'driver_id', 'lat', 'lng', 'image_clip' ]
			},
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		},

		listeners : {
			load : function(store, data, success) {
				if(success)
					Ext.getStore('VehicleFilteredStore').setData(data);
			}
		}
	}
});