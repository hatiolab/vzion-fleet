Ext.define('Base.controller.attachment.Attachment', {
	
	extend: 'Frx.controller.ListController',
		
	models : ['Base.model.Attachment'],
	stores: ['Base.store.Attachment'],
	views : ['Base.view.attachment.Attachment'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_attachment' : this.EntryPoint(),
			'base_attachment #goto_item' : {
				click : this.onGotoItem
			},
			'base_attachment #slideshow' : {
				click : this.onSlideShow
			}
		});
	},
	
	onSlideShow : function(grid, item, rowIndex, colIndex, e, record) {
		HF.slideshow([record.data]);
	}
	
});