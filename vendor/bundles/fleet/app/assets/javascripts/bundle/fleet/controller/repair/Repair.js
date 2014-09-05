/**
 * Repair controller
 */
Ext.define('Fleet.controller.repair.Repair', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Repair', 
		'Fleet.store.Repair', 
		'Fleet.view.repair.Repair' 
	],
	
	models : ['Fleet.model.Repair'],
			
	stores: ['Fleet.store.Repair'],
	
	views : ['Fleet.view.repair.Repair'],
	
	refs: [ { ref : 'Repair', selector : 'fleet_repair' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_repair' : this.EntryPoint(),
			'fleet_repair #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});