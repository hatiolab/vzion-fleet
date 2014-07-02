Ext.define('Fleet.view.consumable.Consumable', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_consumable',
	
	title : T('menu.Consumable'),
	
	store : 'Fleet.store.Consumable',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.code'), dataIndex : 'name' , editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', width : 150 , editor : { xtype : 'textfield' } },
		{ header : T('label.unit'), dataIndex : 'unit', editor : { xtype : 'codecombo', commonCode : 'REPLACE_UNIT' } },
		{ header : T('label.initial_mileage'), dataIndex : 'initial_mileage', width : 110, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.inital_duration'), dataIndex : 'inital_duration', width : 110, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.last_mileage'), dataIndex : 'last_mileage', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.last_duration'), dataIndex : 'last_duration', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.code'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ fieldLabel : T('label.unit'), name : 'unit-eq', xtype : 'codesearchcombo', commonCode : 'REPLACE_UNIT', valueField : 'name', displayField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});