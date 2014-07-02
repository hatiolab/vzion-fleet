/**
 * Terminal controller
 */
Ext.define('Fleet.controller.terminal.Terminal', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Terminal', 
		'Fleet.store.Terminal', 
		'Fleet.view.terminal.Terminal' 
	],
	
	models : ['Fleet.model.Terminal'],
			
	stores: ['Fleet.store.Terminal'],
	
	views : ['Fleet.view.terminal.Terminal'],
	
	refs: [ { ref : 'Terminal', selector : 'fleet_terminal' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_terminal' : this.EntryPoint(),
			'fleet_terminal #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});