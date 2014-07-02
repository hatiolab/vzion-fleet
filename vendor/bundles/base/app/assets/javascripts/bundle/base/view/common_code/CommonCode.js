Ext.define('Base.view.common_code.CommonCode', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_common_code',
	
	title : T('menu.CommonCode'),
	
	store : 'Base.store.CommonCode',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', width : 45, hidden : true },
		{ 
			header : T('label.code'), 
			dataIndex : 'name', 
			flex : 1, 
			editor : { 
				xtype : 'textfield',
				allowBlank : false,
				maxLength : 60
			} 
		},
		{ 
			header : T('label.description'), 
			flex : 2, 
			dataIndex : 'description', 
			editor : { 
				xtype : 'textfield',
				maxLength : 255 
			} 
		},
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 120, dataIndex : 'updated_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'delete']
	} ]
	
});