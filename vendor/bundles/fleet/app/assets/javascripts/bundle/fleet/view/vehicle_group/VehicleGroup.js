Ext.define('Fleet.view.vehicle_group.VehicleGroup', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_group',
	
	title : T('menu.VehicleGroup'),
	
	store : 'Fleet.store.VehicleGroup',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name', allowBlank : false, width : 150 , editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', flex : 1, editor : { xtype : 'textfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});