/**
 * Location controller
 */
Ext.define('Fleet.controller.location.Location', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Location', 
		'Fleet.store.Location', 
		'Fleet.view.location.Location' 
	],
	
	models : ['Fleet.model.Location'],
			
	stores: ['Fleet.store.Location'],
	
	views : ['Fleet.view.location.Location'],
	
	refs: [ { ref : 'Location', selector : 'fleet_location' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location' : this.EntryPoint(),
			'fleet_location #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});