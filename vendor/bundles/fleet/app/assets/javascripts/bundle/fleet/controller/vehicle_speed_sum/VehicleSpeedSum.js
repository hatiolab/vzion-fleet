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
	 * override
	 */
	beforeParamsChange : function(grid, params) {
		params = params ? params : {};
		
		if(!params['run_year-eq'] || !params['run_month-eq']) {
			var today = new Date();
			
			if(!params['run_year-eq'])
				params['run_year-eq'] = today.getFullYear();
				
			if(!params['run_month-eq'])
				params['run_month-eq'] = today.getMonth() + 1;
		}
		
		return params;
	}

});