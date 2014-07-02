Ext.define('Base.view.attachment.AttachmentItem', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_attachment_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},

	title : T('menu.Attachment'),
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : {
		xtype : 'textfield'
	},
	
	items : [		
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), readOnly : true },
		{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'on_type', fieldLabel : T('label.on_type'), readOnly : true },
		{ name : 'on_id', fieldLabel : T('label.on_id'), readOnly : true },
		{ name : 'tag', fieldLabel : T('label.tag'), readOnly : true },
		{ name : 'file_size', fieldLabel : T('label.file_size'), readOnly : true },
		{ name : 'url', fieldLabel : T('label.url'), readOnly : true },
		{ name : 'mimetype', fieldLabel : T('label.mimetype'), readOnly : true },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	}]
});
