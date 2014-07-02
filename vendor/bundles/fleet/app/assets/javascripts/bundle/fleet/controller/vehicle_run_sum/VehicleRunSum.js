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