Ext.define('FleetTouch.store.VehicleConsumableStore', {
	extend : 'Ext.data.Store',

	config : {
		remoteFilter : true,
		  
		fields : [ 
			{
				name : 'id',
				type : 'string'
			}, {
				name : 'domain_id',
				type : 'string'
			}, {
				name : 'vehicle_id',
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
				name : 'health_rate',
				type : 'float'
			}, {
				name : 'cycle_repl_mile',
				type : 'integer'
			}, {
				name : 'cycle_repl_duration',
				type : 'integer'
			}, {
				name : 'repl_unit',
				type : 'string'
			}, {
				name : 'last_repl_date',
				type : 'date'
			}, {
				name : 'last_repl_mile',
				type : 'integer'
			}, {
				name : 'next_repl_date',
				type : 'date'
			}, {
				name : 'next_repl_mile',
				type : 'integer'
			}, {
				name : 'cumulative_cost',
				type : 'float'
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
			}	
		],

		pageSize : 1000,

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/vehicle_consumables' : 'assets/app-touch/data/vehicle_consumable.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}	
		}
	}

});