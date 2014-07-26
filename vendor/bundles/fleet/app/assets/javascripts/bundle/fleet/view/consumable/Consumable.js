Ext.define('Fleet.view.consumable.Consumable', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_consumable',
	
	title : T('menu.Consumable'),
	
	store : 'Fleet.store.Consumable',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.item'), dataIndex : 'name' , editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', width : 150 , editor : { xtype : 'textfield' } },
		{ header : T('label.unit'), dataIndex : 'unit', width : 80, editor : { xtype : 'codecombo', commonCode : 'REPLACE_UNIT' } },
		{ header : T('label.x_repl_cycle_y', {x : T('label.initial'), y : T('label.mile')}), dataIndex : 'init_repl_mile', xtype : 'numbercolumn', format : T('format.number'), width : 160, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_cycle_y', {x : T('label.initial'), y : T('label.month')}), dataIndex : 'init_repl_duration', width : 180, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_cycle_y', {x : '', y : T('label.mile')}), dataIndex : 'repl_mile', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_cycle_y', {x : '', y : T('label.month')}), dataIndex : 'repl_duration', width : 140, align : 'right', editor : { xtype : 'numberfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.item'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ fieldLabel : T('label.unit'), name : 'unit-eq', xtype : 'codesearchcombo', commonCode : 'REPLACE_UNIT', valueField : 'name', displayField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});