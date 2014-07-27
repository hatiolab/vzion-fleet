Ext.define('Fleet.view.driver_status.DriverStatus', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_driver_status',
	
	title : T('menu.DriverStatus'),
	
	store : 'Fleet.store.DriverStatus',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn' },
		{ 
			header : T('label.description'), 
			dataIndex : 'driver', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.status'), dataIndex : 'status', width : 90, editor : { xtype : 'codecombo', commonCode : 'DRIVER_STATUS' } },
		{ header : T('label.total_dist'), dataIndex : 'total_dist', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 110, editor : { xtype : 'numberfield' } },
		{ header : T('label.total_runtime'), dataIndex : 'total_runtime', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 145, editor : { xtype : 'numberfield' } },
		{ header : T('label.avg_effcc'), dataIndex : 'avg_effcc', xtype : 'numbercolumn', format : '0.00', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		//{ header : T('label.eco_index'), dataIndex : 'eco_index', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_run_rate'), dataIndex : 'eco_run_rate', align : 'right', width : 125, editor : { xtype : 'numberfield' } }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Driver', valueField : 'name' },
			{ fieldLabel : T('label.status'), name : 'status-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});