Ext.define('Fleet.view.driver_group.DriverGroupItem', {
	
	extend : 'Ext.grid.Panel',
	
	requires : [ 'Fleet.store.DriversByGroup' ],
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	xtype : 'fleet_driver_group_item',
	
	title : T('menu.DriverGroup'),

	store : 'Fleet.store.DriversByGroup',
	
	sortableColumns : false,

	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit : 1 }) ],
	
	columns : [ 
		{ 
			header : T('label.id'), 
			dataIndex : 'driver', 
			xtype : 'entitycolumn',
			editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Driver' }
		},
		{ header : T('label.name'), dataIndex : 'description' },
		{ header : T('label.social_id'), dataIndex : 'social_id', width : 135 },
		{ header : T('label.division'), dataIndex : 'division' },
		{ header : T('label.title'), dataIndex : 'title', width : 80 },
		{ header : T('label.phone'), dataIndex : 'phone_no', width : 120 },
		{ header : T('label.mobile'), dataIndex : 'mobile_no', width : 120 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});