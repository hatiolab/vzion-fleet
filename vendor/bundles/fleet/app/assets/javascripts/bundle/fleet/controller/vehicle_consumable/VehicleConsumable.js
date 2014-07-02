/**
 * VehicleConsumable controller
 */
Ext.define('Fleet.controller.vehicle_consumable.VehicleConsumable', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.VehicleConsumable', 
		'Fleet.store.VehicleConsumable', 
		'Fleet.view.vehicle_consumable.VehicleConsumable' 
	],
	
	models : ['Fleet.model.VehicleConsumable'],
			
	stores: ['Fleet.store.VehicleConsumable'],
	
	views : ['Fleet.view.vehicle_consumable.VehicleConsumable'],
	
	refs: [ { ref : 'VehicleConsumable', selector : 'fleet_vehicle_consumable' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_consumable' : this.EntryPoint(),
			'fleet_vehicle_consumable #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});