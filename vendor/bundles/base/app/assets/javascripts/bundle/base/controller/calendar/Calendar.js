/**
 * Calendar controller
 */
Ext.define('Base.controller.calendar.Calendar', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.Calendar', 
		'Base.store.Calendar', 
		'Base.view.calendar.Calendar' 
	],
	
	// mixins : [
	// 	'Frx.mixin.controller.ListEntryPoint'
	// ],
	
	models : ['Base.model.Calendar'],
			
	stores: ['Base.store.Calendar'],
	
	views : ['Base.view.calendar.Calendar'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_calendar' : this.EntryPoint(),
			'base_calendar #goto_item' : {
				click : this.onGotoItem
			}
		});
	}
});