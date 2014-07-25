/**
 * VehicleRunSum controller
 */
Ext.define('Fleet.controller.vehicle_run_sum.VehicleRunSum', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleRunSum', 
		'Fleet.store.VehicleRunSum', 
		'Fleet.view.vehicle_run_sum.VehicleRunSum' 
	],
	
	models : ['Fleet.model.VehicleRunSum'],
			
	stores: ['Fleet.store.VehicleRunSum'],
	
	views : ['Fleet.view.vehicle_run_sum.VehicleRunSum'],
	
	refs: [ { ref : 'VehicleRunSum', selector : 'fleet_vehicle_run_sum' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_run_sum' : this.EntryPoint(),
			'fleet_vehicle_run_sum #goto_item' : {
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