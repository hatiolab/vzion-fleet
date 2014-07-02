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