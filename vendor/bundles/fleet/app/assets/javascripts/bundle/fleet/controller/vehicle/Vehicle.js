/**
 * Vehicle controller
 */
Ext.define('Fleet.controller.vehicle.Vehicle', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Vehicle', 
		'Fleet.store.Vehicle', 
		'Fleet.view.vehicle.Vehicle' 
	],
	
	models : ['Fleet.model.Vehicle'],
			
	stores: ['Fleet.store.Vehicle'],
	
	views : ['Fleet.view.vehicle.Vehicle'],
	
	refs: [ { ref : 'Vehicle', selector : 'fleet_vehicle' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle' : this.EntryPoint(),
			'fleet_vehicle #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});