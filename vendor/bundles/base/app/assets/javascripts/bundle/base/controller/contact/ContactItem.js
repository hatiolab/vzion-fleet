/**
 * ContactDetail controller
 */
Ext.define('Base.controller.contact.ContactItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Base.model.Contact', 
		'Base.store.Contact', 
		'Base.view.contact.ContactItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.Contact'],
			
	stores: ['Base.store.Contact'],
	
	views : ['Base.view.contact.ContactItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_contact_item' : this.EntryPoint(),
			'base_contact_form' : this.FormEventHandler()
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});