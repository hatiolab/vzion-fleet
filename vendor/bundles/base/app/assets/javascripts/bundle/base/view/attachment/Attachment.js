Ext.define('Base.view.attachment.Attachment', {
	
	extend : 'Frx.common.ListView',
	
	xtype : 'base_attachment',
		
	title : T('menu.Attachment'),
	
	selectionMode : 'SINGLE',
	
	store : 'Base.store.Attachment',
	
	columns : [
		{ xtype: 'actioncolumn', icon: 'assets/std/iconSlideshow.png', itemId : 'slideshow', width : 30, align : 'center' },
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), width : 140, dataIndex : 'name' },
		{ header : T('label.description'), width : 150, dataIndex : 'description', editor : { xtype : 'textfield', maxLength : 255 } },
		{ header : T('label.on_type'), width : 120, dataIndex : 'on_type' },
		{ header : T('label.tag'), width : 100, dataIndex : 'tag' },
		{ header : T('label.url'), width : 300, dataIndex : 'url' },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 120, dataIndex : 'updated_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'delete']
	}, {
		xtype : 'searchform',
		items : [ 
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ name : 'on_type-eq', 
				fieldLabel : T('label.on_type'), 
				xtype : 'entitysearchcombo', 
				storeClass : 'Base.store.Entity',
				valueField : 'name'
			},			
			{ fieldLabel : T('label.tag'), name : 'tag-like' },
		]
	} ]
	
});