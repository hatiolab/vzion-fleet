/**
 * DriverGroup controller
 */
Ext.define('Fleet.controller.driver_group.DriverGroup', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.DriverGroup', 
		'Fleet.store.DriverGroup', 
		'Fleet.view.driver_group.DriverGroup',
		'Fleet.store.DriversByGroup'
	],
	
	models : ['Fleet.model.DriverGroup'],
			
	stores: ['Fleet.store.DriverGroup'],
	
	views : ['Fleet.view.driver_group.DriverGroup'],
	
	refs: [ { ref : 'DriverGroup', selector : 'fleet_driver_group' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_group' : this.EntryPoint(),
			'fleet_driver_group #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});