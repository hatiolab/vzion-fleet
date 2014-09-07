Ext.define('FleetTouch.store.DriverGroupStore', {
	extend : 'Ext.data.Store',
	
	config : {
		autoLoad : false,

		pageSize : 1000,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'drivers',
			type : 'auto'
		}, {
			name : 'creator_id',
			type : 'string'
		}, {
			name : 'updater_id',
			type : 'string'
		}, {
			name : 'created_at',
			type : 'date'
		}, {
			name : 'updated_at',
			type : 'date'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? 'driver_groups/groups_drivers.json' : 'assets/app-touch/data/driver_group.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}
	}
});