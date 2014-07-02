/**
 * Consumable controller
 */
Ext.define('Fleet.controller.consumable.Consumable', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Consumable', 
		'Fleet.store.Consumable', 
		'Fleet.view.consumable.Consumable' 
	],
	
	models : ['Fleet.model.Consumable'],
			
	stores: ['Fleet.store.Consumable'],
	
	views : ['Fleet.view.consumable.Consumable'],
	
	refs: [ { ref : 'Consumable', selector : 'fleet_consumable' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_consumable' : this.EntryPoint(),
			'fleet_consumable #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});