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
		{ header : T('label.date'), dataIndex : 'run_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.run_time'), dataIndex : 'run_time', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.run_dist'), dataIndex : 'run_dist', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.consmpt'), dataIndex : 'consmpt', align : 'right', width : 100, editor : { xtype : 'numberfield' } },
		{ header : T('label.co2_emss'), dataIndex : 'co2_emss', align : 'right', width : 100, editor : { xtype : 'numberfield' } },
		{ header : T('label.effcc'), dataIndex : 'effcc', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_index'), dataIndex : 'eco_index', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_accel_cnt'), dataIndex : 'sud_accel_cnt', align : 'right', width : 140, editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_brake_cnt'), dataIndex : 'sud_brake_cnt', align : 'right', width : 145, editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_drv_time'), dataIndex : 'eco_drv_time', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.ovr_spd_time'), dataIndex : 'ovr_spd_time', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.idle_time'), dataIndex : 'idle_time', align : 'right', width : 80, editor : { xtype : 'numberfield' } },
		{ header : T('label.inc_cnt'), dataIndex : 'inc_cnt', align : 'right', width : 110, editor : { xtype : 'numberfield' } },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'run_date', xtype : 'daterange' },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});