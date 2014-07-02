Ext.define('Base.view.attachment.AttachmentForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_attachment_form',
	
	title : T('title.attachments'),
	
	mixins : {
		form_life_cycle : 'Frx.mixin.lifecycle.FormLifeCycle'
	},

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'base_attachment_grid',
		flex : 1
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list']
	} ],
	
	initComponent : function() {
		this.callParent();

		this.on(this.FormEventHandler());
	},
	
	onAfterLoadItem : function(view, record, operation) {
		var grid = this.down('base_attachment_grid');
		grid.setInputValue('on_type', HF.humanize(HF.current.resource().type));
		grid.setInputValue('on_id', record.get('id'));
		grid.setInputValue('tag', this.tag || 'attachment');
		
		grid.store.load();
	}
});
