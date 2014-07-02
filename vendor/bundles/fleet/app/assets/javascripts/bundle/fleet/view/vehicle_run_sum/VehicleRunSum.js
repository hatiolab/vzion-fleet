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
		{ header : T('label.date'), dataIndex : 'run_date', xtype : 'datecolumn', format : T('format.date'), width : 80 },
		{ header : T('label.run_time'), dataIndex : 'run_time', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.run_dist'), dataIndex : 'run_dist', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.consmpt'), dataIndex : 'consmpt', align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.co2_emss'), dataIndex : 'co2_emss', align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.effcc'), dataIndex : 'effcc', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.eco_index'), dataIndex : 'eco_index', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.sud_accel_cnt'), dataIndex : 'sud_accel_cnt', width : 140, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.sud_brake_cnt'), dataIndex : 'sud_brake_cnt', width : 145, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.eco_drv_time'), dataIndex : 'eco_drv_time', width : 120, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.ovr_spd_time'), dataIndex : 'ovr_spd_time', width : 120, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.idle_time'), dataIndex : 'idle_time', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.inc_cnt'), dataIndex : 'inc_cnt', width : 110, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.oos_cnt'), dataIndex : 'oos_cnt', width : 125, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.mnt_cnt'), dataIndex : 'mnt_cnt', width : 100, align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },
		{ header : T('label.mnt_time'), dataIndex : 'mnt_time', align : 'right' , editor : { xtype : 'numberfield', minValue : 0 } },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'run_date', xtype : 'daterange' },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});