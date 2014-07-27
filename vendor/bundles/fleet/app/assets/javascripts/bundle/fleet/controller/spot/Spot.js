/**
 * Spot controller
 */
Ext.define('Fleet.controller.spot.Spot', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Spot', 
		'Fleet.store.Spot', 
		'Fleet.view.spot.Spot' 
	],
	
	models : ['Fleet.model.Spot'],
			
	stores: ['Fleet.store.Spot'],
	
	views : ['Fleet.view.spot.Spot'],
	
	refs: [ { ref : 'Spot', selector : 'fleet_spot' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_spot' : this.EntryPoint(),
			'fleet_spot #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});