Ext.define('Base.view.infographic.Infographic', {
	
	extend : 'Frx.common.ListView',
	
	xtype : 'base_infographic',
		
	title : T('menu.Infographic'),
	
	store : 'Base.store.Infographic',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), width : 150, dataIndex : 'name', editor : {xtype : 'textfield'} },
		{ header : T('label.description'), dataIndex : 'description', editor : {xtype : 'textfield'}, flex : 1 },
		{ xtype : 'codecolumn', commonCode : 'INFOGRAPHIC_TYPE', tpl : '{description}', header : T('label.infographic_type'), width : 120, dataIndex : 'infographic_type', editor : { xtype : 'codecombo', commonCode : 'INFOGRAPHIC_TYPE' } },
		{ xtype : 'codecolumn', commonCode : 'PRINTER_TYPE', tpl : '{description}', header : T('label.printer_type'), width : 100, dataIndex : 'printer_type', editor : { xtype : 'codecombo', commonCode : 'PRINTER_TYPE' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), width : 120, dataIndex : 'updated_at', xtype : 'datecolumn', readOnly : true, format : T('format.datetime') }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ 
				fieldLabel : T('label.infographic_type'), 
				name : 'infographic_type-eq', 
				xtype : 'codesearchcombo', 
				valueField : 'name',
				displayField : 'description', 
				commonCode : 'INFOGRAPHIC_TYPE' 
			},
			{ 
				fieldLabel : T('label.printer_type'), 
				name : 'printer_type-eq', 
				xtype : 'codesearchcombo', 
				valueField : 'name',
				displayField : 'description', 
				commonCode : 'PRINTER_TYPE'
			}
		]	
	}, {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'delete']
	} ]
});