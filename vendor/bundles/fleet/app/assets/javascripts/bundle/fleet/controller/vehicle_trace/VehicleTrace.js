/**
 * VehicleTrace controller
 */
Ext.define('Fleet.controller.vehicle_trace.VehicleTrace', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleTrace', 
		'Fleet.store.VehicleTrace', 
		'Fleet.view.vehicle_trace.VehicleTrace' 
	],
	
	models : ['Fleet.model.VehicleTrace'],
			
	stores: ['Fleet.store.VehicleTrace'],
	
	views : ['Fleet.view.vehicle_trace.VehicleTrace'],
	
	refs: [ { ref : 'VehicleTrace', selector : 'fleet_vehicle_trace' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_trace' : this.EntryPoint({
				click_simulation : this.onSimulation
			}),
			'fleet_vehicle_trace #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
	
	/**
	 * override : grid reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(grid, params) {
		params = params ? params : {};
		if(!params['trace_time-dt_eq']) {
			params['trace_time-dt_eq'] = new Date();
		}
		return params;
	},
	
	onSimulation : function() {
    	Ext.Ajax.request({
		    url : 'diy_services/FleetTraceSimulation/shoot.json',
		    method : 'POST',
		    success : function(response) {
				HF.current.view().getStore().reload();
				HF.msg.notice(T('text.Success to Create'));
			},
			scope : this
		});
	}

});