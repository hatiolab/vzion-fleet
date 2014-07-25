/**
 * DriverSpeedSum controller
 */
Ext.define('Fleet.controller.driver_speed_sum.DriverSpeedSum', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.DriverSpeedSum', 
		'Fleet.store.DriverSpeedSum', 
		'Fleet.view.driver_speed_sum.DriverSpeedSum' 
	],
	
	models : ['Fleet.model.DriverSpeedSum'],
			
	stores: ['Fleet.store.DriverSpeedSum'],
	
	views : ['Fleet.view.driver_speed_sum.DriverSpeedSum'],
	
	refs: [ { ref : 'DriverSpeedSum', selector : 'fleet_driver_speed_sum' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_speed_sum' : this.EntryPoint(),
			'fleet_driver_speed_sum #goto_item' : {
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