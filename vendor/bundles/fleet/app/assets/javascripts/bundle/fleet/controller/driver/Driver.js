/**
 * Driver controller
 */
Ext.define('Fleet.controller.driver.Driver', {
	
	extend: 'Frx.controller.ListController',
	
	mixins : { slideshow : 'Base.mixin.lifecycle.ListSlideShow' },
	
	requires : [ 
		'Fleet.model.Driver', 
		'Fleet.store.Driver', 
		'Fleet.view.driver.Driver' 
	],
	
	models : ['Fleet.model.Driver'],
			
	stores: ['Fleet.store.Driver'],
	
	views : ['Fleet.view.driver.Driver'],
	
	refs: [ { ref : 'Driver', selector : 'fleet_driver' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver' : this.EntryPoint(),
			'fleet_driver #goto_item' : {
				click : this.onGotoItem
			},
			'fleet_driver #slideshow' : {
				click : this.onSlideShow
			}
		});
	}

});