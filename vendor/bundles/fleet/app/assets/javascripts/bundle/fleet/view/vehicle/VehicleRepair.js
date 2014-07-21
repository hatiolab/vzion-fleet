Ext.define('Fleet.view.vehicle.VehicleRepair', {
	
	extend : 'Ext.grid.Panel',
	
	requires : [ 'Fleet.store.VehicleRepair' ],
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	xtype : 'fleet_vehicle_repair',
	
	title : T('menu.VehicleRepair'),

	store : 'Fleet.store.VehicleRepair',
	
	sortableColumns : false,

	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit : 1 }) ],
	
	columns : [ 
		{ header : T('label.x_date', {x : T('label.repair')}), dataIndex : 'repair_date', xtype : 'datecolumn', format : T('format.date'), width : 120, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.repair_time'), dataIndex : 'repair_time', align : 'right', width : 150 , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_date', {x : T('label.next_repair')}), dataIndex : 'next_repair_date', xtype : 'datecolumn', format : T('format.date'), width : 120, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.repair_mileage'), dataIndex : 'repair_mileage', align : 'right', width : 150 , editor : { xtype : 'numberfield' } },
		{ header : T('label.repair_man'), dataIndex : 'repair_man', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.repair_shop'), dataIndex : 'repair_shop', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.cost'), dataIndex : 'cost', align : 'right', width : 150 , editor : { xtype : 'numberfield' } },
		{ header : T('label.content'), dataIndex : 'content', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.comment'), dataIndex : 'comment', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.oos'), dataIndex : 'oos', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', allowBlank : false, editor : { xtype : 'textfield' } }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});