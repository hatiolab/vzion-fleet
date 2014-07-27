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
			'fleet_vehicle_checkin' : this.EntryPoint({
				click_simulation : this.onSimulation,
				click_daily_summary : this.onDailySummary,
				click_monthly_summary : this.onMonthlySummary,
			}),
			'fleet_vehicle_checkin #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
	
	/**
	 * override
	 */
	beforeParamsChange : function(grid, params) {
		params = params ? params : {};
		if(!params['run_date-eq']) {
			params['run_date-eq'] = new Date();
		}
		return params;
	},
	
	/**
	 * checkin data generation
	 */
	onSimulation : function() {
    	Ext.Ajax.request({
		    url : 'diy_services/FleetCheckinSimulation/shoot.json',
		    method : 'POST',
		    success : function(response) {
				HF.current.view().getStore().reload();
				HF.msg.notice(T('text.Success to Create'));
			},
			scope : this
		});
	},
	
	/**
	 * daily summary data generation
	 */
	onDailySummary : function() {
    	Ext.Ajax.request({
		    url : 'diy_services/FleetDailySummary/shoot.json',
		    method : 'POST',
		    success : function(response) {
				HF.msg.notice(T('text.Success to Create'));
			},
			scope : this
		});
	},
	
	/**
	 * monthly summary data generation
	 */
	onMonthlySummary : function() {
    	Ext.Ajax.request({
		    url : 'diy_services/FleetMonthlySummary/shoot.json',
		    method : 'POST',
		    success : function(response) {
				HF.msg.notice(T('text.Success to Create'));
			},
			scope : this
		});
	}
});