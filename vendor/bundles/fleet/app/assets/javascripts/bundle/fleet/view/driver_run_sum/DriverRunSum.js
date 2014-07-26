Ext.define('Fleet.view.driver_run_sum.DriverRunSum', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_driver_run_sum',
	
	title : T('menu.DriverRunSum'),
	
	store : 'Fleet.store.DriverRunSum',
	
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
		{ header : T('label.year'), dataIndex : 'run_year', width : 55, align : 'right' },
		{ header : T('label.month'), dataIndex : 'run_month', width : 60, align : 'right' },
		{ header : T('label.run_time'), dataIndex : 'run_time', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 110, editor : { xtype : 'numberfield' } },
		{ header : T('label.run_dist'), dataIndex : 'run_dist', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 110, editor : { xtype : 'numberfield' } },
		{ header : T('label.consmpt'), dataIndex : 'consmpt', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 115, editor : { xtype : 'numberfield' } },
		{ header : T('label.co2_emss'), dataIndex : 'co2_emss', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 145, editor : { xtype : 'numberfield' } },
		{ header : T('label.effcc'), dataIndex : 'effcc', xtype : 'numbercolumn', format : '0.00', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_index'), dataIndex : 'eco_index', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_accel_cnt'), dataIndex : 'sud_accel_cnt', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 140, editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_brake_cnt'), dataIndex : 'sud_brake_cnt', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 145, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_drv_time'), dataIndex : 'eco_drv_time', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 160, editor : { xtype : 'numberfield' } },
		{ header : T('label.ovr_spd_time'), dataIndex : 'ovr_spd_time', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 160, editor : { xtype : 'numberfield' } },
		{ header : T('label.idle_time'), dataIndex : 'idle_time', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.inc_cnt'), dataIndex : 'inc_cnt', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 110, editor : { xtype : 'numberfield' } },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.year'), name : 'run_year-eq', xtype : 'numberfield', minValue : 2010, maxValue : 2100 },
			{ fieldLabel : T('label.month'), name : 'run_month-eq', xtype : 'numberfield', minValue : 1, maxValue : 12 },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});