/**
 * VehicleCheckin controller
 */
Ext.define('Fleet.controller.vehicle_checkin.VehicleCheckin', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleCheckin', 
		'Fleet.store.VehicleCheckin', 
		'Fleet.view.vehicle_checkin.VehicleCheckin' 
	],
	
	models : ['Fleet.model.VehicleCheckin'],
			
	stores: ['Fleet.store.VehicleCheckin'],
	
	views : ['Fleet.view.vehicle_checkin.VehicleCheckin'],
	
	refs: [ { ref : 'VehicleCheckin', selector : 'fleet_vehicle_checkin' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_checkin' : this.EntryPoint(),
			'fleet_vehicle_checkin #goto_item' : {
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