Ext.define('Base.view.role.Role', {
	
	extend : 'Frx.common.ListView',
	
	xtype : 'base_role',
	
	title : T('menu.Role'),
	
	store : 'Base.store.Role',

	columns : [ { 
		header : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, { 
		dataIndex : 'name', 
		header : T('label.name'),
		editor : {
			xtype : 'textfield',
			allowBlank : false,
			maxLength : 60
		}
	}, { 
		dataIndex : 'description', 
		header : T('label.description'),
		flex : 1,
		editor : {
			xtype: 'textfield',
			allowBlank: true,
			maxLength : 255
		}
	}, { 
		header : T('label.updater'),
		dataIndex : 'updater',
		xtype : 'entitycolumn'
	}, { 
		dataIndex : 'updated_at', 
		header : T('label.updated_at'), 
		xtype : 'datecolumn', 
		format : T('format.datetime'), 
		width : 120
	} ],
	
	dockedItems : [ {
		xtype : 'searchform',
		items : [ { 
			fieldLabel : T('label.name'), 
			name : 'name-like' 
		}, { 
			fieldLabel : T('label.description'), 
			name : 'description-like' 
		} ]
	}, {
		xtype : 'controlbar',
		items : ['->', 'add', 'save', 'delete']
	} ]
});