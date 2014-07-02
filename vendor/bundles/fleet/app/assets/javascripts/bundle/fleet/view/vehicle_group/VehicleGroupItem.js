Ext.define('Fleet.view.vehicle_group.VehicleGroupItem', {
	
	extend : 'Ext.grid.Panel',
	
	requires : [ 'Fleet.store.VehiclesByGroup' ],
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	xtype : 'fleet_vehicle_group_item',
	
	title : T('menu.VehicleGroup'),

	store : 'Fleet.store.VehiclesByGroup',
	
	sortableColumns : false,

	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit : 1 }) ],
	
	columns : [ 
		{ 
			header : T('label.id'), 
			dataIndex : 'vehicle', 
			xtype : 'entitycolumn',
			editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' }
		},
		{ header : T('label.reg_no'), dataIndex : 'name' , editor : { xtype : 'textfield' } , sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.description'), dataIndex : 'description' },
		{ header : T('label.model'), dataIndex : 'model' , editor : { xtype : 'textfield' } },
		{ header : T('label.vendor'), dataIndex : 'vendor', editor : { xtype : 'codecombo', commonCode : 'V_VENDOR' } },
		{ header : T('label.classicfication'), dataIndex : 'classicfication', editor : { xtype : 'codecombo', commonCode : 'V_CLASS' } },
		{ header : T('label.fuel_type'), dataIndex : 'fuel_type', editor : { xtype : 'codecombo', commonCode : 'V_FUEL' } },
		{ header : T('label.ownership'), dataIndex : 'ownership', editor : { xtype : 'codecombo', commonCode : 'V_OWNERSHIP' } },
		{ header : T('label.birth_year'), dataIndex : 'birth_year', align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.seat_size'), dataIndex : 'seat_size', align : 'right' , editor : { xtype : 'numberfield' } },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});