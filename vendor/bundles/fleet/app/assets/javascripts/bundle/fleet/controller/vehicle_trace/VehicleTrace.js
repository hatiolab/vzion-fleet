/**
 * VehicleTrace controller
 */
Ext.define('Fleet.controller.vehicle_trace.VehicleTrace', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleTrace', 
		'Fleet.store.VehicleTrace', 
		'Fleet.view.vehicle_trace.VehicleTrace' 
	],
	
	models : ['Fleet.model.VehicleTrace'],
			
	stores: ['Fleet.store.VehicleTrace'],
	
	views : ['Fleet.view.vehicle_trace.VehicleTrace'],
	
	refs: [ { ref : 'VehicleTrace', selector : 'fleet_vehicle_trace' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_trace' : this.EntryPoint(),
			'fleet_vehicle_trace #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
	
	/**
	 * override : grid reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(grid, params) {
		params = params ? params : {};
		var today = new Date();
		
		if(!params['trace_time-lte']) {
			params['trace_time-lte'] = today;
		}
		
		if(!params['trace_time-gte']) {
			var yesterDay = new Date();
			yesterDay.setDate(yesterDay.getDate() - 1);
			params['trace_time-gte'] = yesterDay;
		}
		
		return params;
	}

});