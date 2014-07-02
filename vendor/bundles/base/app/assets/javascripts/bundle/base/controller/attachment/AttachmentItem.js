Ext.define('Base.controller.attachment.AttachmentItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
		
	models : ['Base.model.Attachment'],
	stores: ['Base.store.Attachment'],
	views : ['Base.view.attachment.AttachmentItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_attachment_item' : this.EntryPointWith(
				this.FormEventHandler()
			)
		});
	// },
	// 
	// onAfterLoadItem : function(view, record, operation) {
	// 	var grid = view.down('attachment_grid');
	// 	
	// 	grid.setAttachmentId(record.get('id'));
	// 	grid.getStore().loadData(record.get('attachments'));
	}
	
});
