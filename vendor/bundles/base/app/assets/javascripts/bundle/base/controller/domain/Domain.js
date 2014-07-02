/**
 * Domain controller
 */
Ext.define('Base.controller.domain.Domain', {
	
	extend: 'Frx.controller.ListController',
	
	mixins : {
		slideshow : 'Base.mixin.lifecycle.ListSlideShow'
	},
	
	requires : [ 
		'Base.model.Domain', 
		'Base.store.Domain', 
		'Base.view.domain.Domain' 
	],
	
	models : ['Base.model.Domain'],
			
	stores: ['Base.store.Domain'],
	
	views : ['Base.view.domain.Domain'],
	
	refs: [ { ref : 'Domain', selector : 'base_domain' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_domain' : this.EntryPoint(),
			'base_domain #goto_item' : {
				click : this.onGotoItem
			},
			'base_domain #slideshow' : {
				click : this.onSlideShow
			}
		});
	}
});