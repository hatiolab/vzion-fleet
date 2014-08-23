/*
 * This store only for local filtering. VehicleMapStore will load data on this
 * store. So, never Load this Store.
 */
Ext.define('FleetTouch.store.VehicleFilteredStore', {
	
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,

		pageSize : 1000,

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
		} ]
	}

});