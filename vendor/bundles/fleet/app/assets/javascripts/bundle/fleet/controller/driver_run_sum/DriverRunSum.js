/**
 * DriverRunSum controller
 */
Ext.define('Fleet.controller.driver_run_sum.DriverRunSum', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.DriverRunSum', 
		'Fleet.store.DriverRunSum', 
		'Fleet.view.driver_run_sum.DriverRunSum' 
	],
	
	models : ['Fleet.model.DriverRunSum'],
			
	stores: ['Fleet.store.DriverRunSum'],
	
	views : ['Fleet.view.driver_run_sum.DriverRunSum'],
	
	refs: [ { ref : 'DriverRunSum', selector : 'fleet_driver_run_sum' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_run_sum' : this.EntryPoint(),
			'fleet_driver_run_sum #goto_item' : {
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