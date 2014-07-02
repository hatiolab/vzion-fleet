Ext.define('Base.controller.user.UserItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	requires : [ 
		'Base.model.User', 
		'Base.store.User', 
		'Base.view.user.UserItem'
	],
	
	models : ['Base.model.User'],
			
	stores: ['Base.store.User', 'Base.store.Timezone'],
	
	views : ['Base.view.user.UserItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_user_item' : this.EntryPointWith(
				this.FormEventHandler()
			)
		});
	}
	
});