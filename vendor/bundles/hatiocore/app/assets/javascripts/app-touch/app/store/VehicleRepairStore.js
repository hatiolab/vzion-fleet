Ext.define('FleetTouch.store.VehicleRepairStore', {
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,
		
		remoteFilter : true,

		pageSize : 1,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'vehicle_id',
			type : 'string'
		}, {
			name : 'next_repair_date',
			type : 'date'
		}, {
			name : 'repair_date',
			type : 'date'
		}, {
			name : 'repair_man',
			type : 'string'
		}, {
			name : 'repair_mileage',
			type : 'string'
		}, {
			name : 'repair_shop',
			type : 'string'
		}, {
			name : 'repair_time',
			type : 'string'
		}, {
			name : 'oos',
			type : 'string'
		}, {
			name : 'creator_id',
			type : 'integer'
		}, {
			name : 'updater_id',
			type : 'integer'
		}, {
			name : 'created_at',
			type : 'date'
		}, {
			name : 'updated_at',
			type : 'date'
		}],

		sorters : [ {
			property : 'created_at',
			direction : 'DESC'
		} ],
		
		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/repairs' : 'assets/app-touch/data/vehicle_repair.json',
			extraParams : {
			},
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total',
				successProperty : 'success'
			}
		}
	}

});