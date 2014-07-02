Ext.define('Base.view.diy_service.DiyService', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_diy_service',
	
	title : T('menu.DiyService'),
		
	store : 'Base.store.DiyService',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name', width : 170, editor : { xtype : 'textfield', allowBlank : false } },
		{ header : T('label.description'), dataIndex : 'description', flex : 1, editor : { xtype : 'textfield' } },
		{ header : T('label.script_type'), dataIndex : 'script_type', editor : { xtype : 'codecombo', commonCode : 'SCRIPT_TYPE', allowBlank : false }, width : 90 },
		{ header : T('label.active_flag'), dataIndex : 'active_flag', xtype : 'checkcolumn', width : 60 },
		{ header : T('label.atomic_flag'), dataIndex : 'atomic_flag', xtype : 'checkcolumn', width : 60 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 120, dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ 
				fieldLabel : T('label.script_type'), 
				name : 'script_type-eq', 
				xtype : 'codesearchcombo', 
				commonCode : 'SCRIPT_TYPE',
				valueField : 'name',
				displayField : 'name'
			},
			'-',
			{ 
				fieldLabel : T('label.active_flag'), 
				name : 'active_flag-eq', 
				inputValue : true, 
				xtype : 'checkboxfield' 
			},
			{ 
				fieldLabel : T('label.atomic_flag'), 
				name : 'atomic_flag-eq', 
				inputValue : true, 
				xtype : 'checkboxfield' 
			}
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
	
});