Ext.define('Fleet.view.repair.Repair', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_repair',
	
	title : T('menu.Repair'),
	
	store : 'Fleet.store.Repair',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' } },
		{ header : T('label.x_date', {x : T('label.next_repair')}), dataIndex : 'next_repair_date', xtype : 'datecolumn', format : T('format.date'), width : 120, align : 'center', editor : { xtype : 'datefield', format : T('format.date'), submitDate : T('format.submitDate') } },
		{ header : T('label.x_date', {x : T('label.repair')}), dataIndex : 'repair_date', xtype : 'datecolumn', format : T('format.date'), width : 95, align : 'center', editor : { xtype : 'datefield', format : T('format.date'), submitDate : T('format.submitDate') } },
		{ header : T('label.repair_man'), dataIndex : 'repair_man' , editor : { xtype : 'textfield' } },
		{ header : T('label.repair_mileage'), dataIndex : 'repair_mileage', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.repair_shop'), dataIndex : 'repair_shop' , editor : { xtype : 'textfield' } },
		{ header : T('label.repair_time'), dataIndex : 'repair_time', align : 'right', width : 130, editor : { xtype : 'numberfield' } },
		{ header : T('label.cost'), dataIndex : 'cost', xtype : 'numbercolumn', format : T('format.number'), width : 65, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 },
	],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});