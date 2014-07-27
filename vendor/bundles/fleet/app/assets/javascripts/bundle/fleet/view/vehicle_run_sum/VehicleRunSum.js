Ext.define('Fleet.view.vehicle_run_sum.VehicleRunSum', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_run_sum',
	
	title : T('menu.VehicleRunSum'),
	
	store : 'Fleet.store.VehicleRunSum',
	
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
		{ header : T('label.year'), dataIndex : 'run_year', width : 55, align : 'right' },
		{ header : T('label.month'), dataIndex : 'run_month', width : 60, align : 'right' },
		{ header : T('label.run_dist'), dataIndex : 'run_dist', xtype : 'numbercolumn', format : T('format.number'), width : 105, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.run_time'), dataIndex : 'run_time', xtype : 'numbercolumn', format : T('format.number'), width : 110, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.idle_time'), dataIndex : 'idle_time', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.eco_drv_time'), dataIndex : 'eco_drv_time', xtype : 'numbercolumn', format : T('format.number'), width : 160, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.ovr_spd_time'), dataIndex : 'ovr_spd_time', xtype : 'numbercolumn', format : T('format.number'), width : 160, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.mnt_time'), dataIndex : 'mnt_time', xtype : 'numbercolumn', format : T('format.number'), width : 135, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.consmpt'), dataIndex : 'consmpt', xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.co2_emss'), dataIndex : 'co2_emss', xtype : 'numbercolumn', format : T('format.number'), width : 145, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.effcc'), dataIndex : 'effcc', xtype : 'numbercolumn', format : '0.00', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_index'), dataIndex : 'eco_index', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.sud_accel_cnt'), dataIndex : 'sud_accel_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 140, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.sud_brake_cnt'), dataIndex : 'sud_brake_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 145, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.inc_cnt'), dataIndex : 'inc_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 110, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.oos_cnt'), dataIndex : 'oos_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 125, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.mnt_cnt'), dataIndex : 'mnt_cnt', xtype : 'numbercolumn', format : T('format.number'), width : 100, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.year'), name : 'run_year-eq', xtype : 'numberfield', minValue : 2010, maxValue : 2100 },
			{ fieldLabel : T('label.month'), name : 'run_month-eq', xtype : 'numberfield', minValue : 1, maxValue : 12 },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});