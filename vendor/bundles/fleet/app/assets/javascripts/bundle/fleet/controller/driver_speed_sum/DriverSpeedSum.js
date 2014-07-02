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