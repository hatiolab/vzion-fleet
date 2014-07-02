/**
 * Contact controller
 */
Ext.define('Base.controller.contact.Contact', {
	
	extend: 'Frx.controller.ListController',
	
	mixins : {
		slideshow : 'Base.mixin.lifecycle.ListSlideShow'
	},
	
	requires : [ 
		'Base.model.Contact', 
		'Base.store.Contact', 
		'Base.view.contact.Contact' 
	],
	
	models : ['Base.model.Contact'],
			
	stores: ['Base.store.Contact'],
	
	views : ['Base.view.contact.Contact'],
	
	refs: [ { ref : 'Contact', selector : 'base_contact' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_contact' : this.EntryPoint(),
			'base_contact #goto_item' : {
				click : this.onGotoItem
			},
			'base_contact #slideshow' : {
				click : this.onSlideShow
			}
		});
	},
	
	/**
	 * export : 클라이언트에서 화면에 있는 데이터를 그대로 올려보내고 서버에서는 받은 데이터를 그대로 엑셀로 export
	 */
	onListClickExport : function(grid) {
		HF.exportScreen(grid, 'contacts/export_screen.xls');
	}

});