Ext.define('FleetTouch.store.IncidentByVehicleStore', {
	extend: 'Ext.data.Store',

	config: {
		autoLoad: false,

		pageSize: 4,

		remoteFilter : true,
		
		remoteSort : true,
		  
		fields: [{
			name: 'id',
			type: 'string'
		},
		{
			name: 'domain_id',
			type: 'string'
		},
		{
			name: 'terminal_id',
			type: 'string'
		},
		{
			name: 'vehicle_id',
			type: 'string'
		},
		{
			name: 'driver_id',
			type: 'string'
		},
		{
			name: 'lat',
			type: 'float'
		},
		{
			name: 'lng',
			type: 'float'
		},
		{
			name: 'velocity',
			type: 'float'
		},
		{
			name: 'impulse_abs',
			type: 'float'
		},
		{
			name: 'impulse_x',
			type: 'float'
		},
		{
			name: 'impulse_y',
			type: 'float'
		},
		{
			name: 'impulse_z',
			type: 'float'
		},
		{
			name: 'impulse_threshold',
			type: 'float'
		},
		{
			name: 'obd_connected',
			type: 'boolean'
		},
		{
			name: 'confirm',
			type: 'boolean'
		},
		{
			name: 'engine_temp',
			type: 'float'
		},
		{
			name: 'engine_temp_threshold',
			type: 'float'
		},
		{
			name: 'video_clip',
			type: 'string'
		},
		{
			name: 'creator_id',
			type: 'string'
		},
		{
			name: 'updater_id',
			type: 'string'
		},
		{
			name: 'created_at',
			type: 'date'
		},
		{
			name: 'updated_at',
			type: 'date'
		}],

		sorters: [{
			property: 'created_at',
			direction: 'DESC'
		}],

		proxy: {
			type: 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/incidents' : 'assets/app-touch/data/incident_by_vehicle.json',
			reader: {
				type: 'json',
				rootProperty: 'items',
				totalProperty: 'total'
			}
		}
	}
});