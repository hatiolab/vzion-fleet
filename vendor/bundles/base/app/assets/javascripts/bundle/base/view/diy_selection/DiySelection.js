Ext.define('Base.view.diy_selection.DiySelection', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_diy_selection',
	
	title : T('menu.DiySelection'),
	
	store : 'Base.store.DiySelection',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name', flex: 1, allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 1, editor : { xtype : 'textfield' } },
		{ header : T('label.script_type'), dataIndex : 'script_type', allowBlank : false, editor : { xtype : 'codecombo', commonCode : 'SCRIPT_TYPE' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 120, dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime') }
	],

	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ 
				fieldLabel : T('label.name'), 
				name : 'name-like' 
			},
			{ 
				fieldLabel : T('label.description'), 
				name : 'description-like' 
			},
			{ 
				fieldLabel : T('label.script_type'), 
				name : 'script_type-eq', 
				xtype : 'codesearchcombo', 
				commonCode : 'SCRIPT_TYPE',
				valueField : 'name',
				displayField : 'name'
			},
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});