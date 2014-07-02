/**
 * VehicleSpeedSum controller
 */
Ext.define('Fleet.controller.vehicle_speed_sum.VehicleSpeedSum', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleSpeedSum', 
		'Fleet.store.VehicleSpeedSum', 
		'Fleet.view.vehicle_speed_sum.VehicleSpeedSum' 
	],
	
	models : ['Fleet.model.VehicleSpeedSum'],
			
	stores: ['Fleet.store.VehicleSpeedSum'],
	
	views : ['Fleet.view.vehicle_speed_sum.VehicleSpeedSum'],
	
	refs: [ { ref : 'VehicleSpeedSum', selector : 'fleet_vehicle_speed_sum' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_speed_sum' : this.EntryPoint(),
			'fleet_vehicle_speed_sum #goto_item' : {
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
		
		if(!params['run_date-lte']) {
			params['run_date-lte'] = today;
		}
		
		if(!params['run_date-gte']) {
			var beforeDay = new Date();
			beforeDay.setDate(beforeDay.getDate() - 5);
			params['run_date-gte'] = beforeDay;
		}
		
		return params;
	}

});