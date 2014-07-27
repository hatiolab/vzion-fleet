Ext.define('Fleet.view.vehicle_status.VehicleStatus', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_status',
	
	title : T('menu.VehicleStatus'),
	
	store : 'Fleet.store.VehicleStatus',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn' },
		{ 
			header : T('label.description'), 
			dataIndex : 'vehicle', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn' },
		{ 
			header : T('label.description'), 
			dataIndex : 'driver', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.terminal'), dataIndex : 'terminal', xtype : 'entitycolumn' },
		{ 
			header : T('label.description'), 
			dataIndex : 'terminal', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.status'), dataIndex : 'status', width : 90, editor : { xtype : 'codecombo', commonCode : 'RUN_STATUS' } },
		{ header : T('label.health_status'), dataIndex : 'health_status', width : 90, editor : { xtype : 'codecombo', commonCode : 'HEALTH_STATUS' } },
		{ header : T('label.total_dist'), dataIndex : 'total_dist', xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right', editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.total_runtime'), dataIndex : 'total_runtime', xtype : 'numbercolumn', format : T('format.number'), width : 145, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.remain_fuel'), dataIndex : 'remain_fuel', width : 115, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.official_effcc'), dataIndex : 'official_effcc', xtype : 'numbercolumn', format : '0.00', width : 140, align : 'right', editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.avg_effcc'), dataIndex : 'avg_effcc', xtype : 'numbercolumn', format : '0.00', width : 120, align : 'right', editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.eco_index'), dataIndex : 'eco_index', width : 80, align : 'right', editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.eco_run_rate'), dataIndex : 'eco_run_rate', width : 125, align : 'right', editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.lat'), dataIndex : 'lat', xtype : 'numbercolumn', format : '0.0000', width : 75, align : 'right', editor : { xtype : 'numberfield' } },
		{ header : T('label.lng'), dataIndex : 'lng', xtype : 'numbercolumn', format : '0.0000', width : 85, align : 'right', editor : { xtype : 'numberfield' } }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.status'), name : 'status-eq', xtype : 'codesearchcombo', commonCode : 'RUN_STATUS', valueField : 'name', displayField : 'name' },
			{ fieldLabel : T('label.health_status'), name : 'health_status-eq', xtype : 'codesearchcombo', commonCode : 'HEALTH_STATUS', valueField : 'name', displayField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});