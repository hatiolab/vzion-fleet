/**
 * VehicleGroup controller
 */
Ext.define('Fleet.controller.vehicle_group.VehicleGroup', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleGroup', 
		'Fleet.store.VehicleGroup', 
		'Fleet.view.vehicle_group.VehicleGroup' 
	],
	
	models : ['Fleet.model.VehicleGroup'],
			
	stores: ['Fleet.store.VehicleGroup'],
	
	views : ['Fleet.view.vehicle_group.VehicleGroup'],
	
	refs: [ { ref : 'VehicleGroup', selector : 'fleet_vehicle_group' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_group' : this.EntryPoint(),
			'fleet_vehicle_group #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});