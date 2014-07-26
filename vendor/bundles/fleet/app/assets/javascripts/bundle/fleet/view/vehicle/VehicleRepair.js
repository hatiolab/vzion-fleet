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
		{ header : T('label.time'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },
		{ header : T('label.repair_mileage'), dataIndex : 'repair_mileage', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_date', {x : T('label.repair')}), dataIndex : 'repair_date', xtype : 'datecolumn', format : T('format.date'), width : 95, align : 'center', editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.repair_time') + ' (min.)', dataIndex : 'repair_time', align : 'right', width : 130 , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_date', {x : T('label.next_repair')}), dataIndex : 'next_repair_date', xtype : 'datecolumn', format : T('format.date'), width : 120, align : 'center', editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.repair_man'), dataIndex : 'repair_man', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.repair_shop'), dataIndex : 'repair_shop', allowBlank : false, editor : { xtype : 'textfield' } },
		{ header : T('label.cost'), dataIndex : 'cost', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 80 , editor : { xtype : 'numberfield' } },
		{ header : T('label.content'), dataIndex : 'content', width : 200, editor : { xtype : 'textfield' } },
		{ header : T('label.comment'), dataIndex : 'description', width : 200, editor : { xtype : 'textfield' } }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});