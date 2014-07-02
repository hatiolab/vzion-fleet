/**
 * DriverStatus controller
 */
Ext.define('Fleet.controller.driver_status.DriverStatus', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.DriverStatus', 
		'Fleet.store.DriverStatus', 
		'Fleet.view.driver_status.DriverStatus' 
	],
	
	models : ['Fleet.model.DriverStatus'],
			
	stores: ['Fleet.store.DriverStatus'],
	
	views : ['Fleet.view.driver_status.DriverStatus'],
	
	refs: [ { ref : 'DriverStatus', selector : 'fleet_driver_status' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_status' : this.EntryPoint(),
			'fleet_driver_status #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});