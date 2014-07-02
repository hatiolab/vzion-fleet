/**
 * VehicleStatus controller
 */
Ext.define('Fleet.controller.vehicle_status.VehicleStatus', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleStatus', 
		'Fleet.store.VehicleStatus', 
		'Fleet.view.vehicle_status.VehicleStatus' 
	],
	
	models : ['Fleet.model.VehicleStatus'],
			
	stores: ['Fleet.store.VehicleStatus'],
	
	views : ['Fleet.view.vehicle_status.VehicleStatus'],
	
	refs: [ { ref : 'VehicleStatus', selector : 'fleet_vehicle_status' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_status' : this.EntryPoint(),
			'fleet_vehicle_status #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});