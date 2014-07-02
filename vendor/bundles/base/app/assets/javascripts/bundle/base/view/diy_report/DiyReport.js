Ext.define('Base.view.diy_report.DiyReport', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_diy_report',
	
	title : T('menu.DiyReport'),
	
	store : 'Base.store.DiyReport',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name', width : 200, editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 1, editor : { xtype : 'textfield' } },
		{ header : T('menu.DiySelection'), dataIndex : 'diy_selection', width : 200, xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Base.store.DiySelection' } },
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
				fieldLabel : T('menu.DiySelection'), 
				name : 'diy_selection.name-eq', 
				xtype : 'entitysearchcombo', 
				storeClass : 'Base.store.DiySelection',
				valueField : 'name'
			}
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});