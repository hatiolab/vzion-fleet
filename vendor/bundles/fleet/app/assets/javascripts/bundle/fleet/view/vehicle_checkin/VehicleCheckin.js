Ext.define('Fleet.view.vehicle_checkin.VehicleCheckin', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_checkin',
	
	title : T('menu.VehicleCheckin'),
	
	store : 'Fleet.store.VehicleCheckin',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.terminal'), dataIndex : 'terminal', xtype : 'entitycolumn' },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn' },
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn' },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), 
			dataIndex : 'vehicle', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.date'), dataIndex : 'run_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.start_time'), dataIndex : 'start_time', editor : { xtype : 'datefield', format : T('format.datetime') } },
		{ header : T('label.run_dist'), dataIndex : 'run_dist', align : 'right', width : 80 , editor : { xtype : 'numberfield' } },
		{ header : T('label.run_time'), dataIndex : 'run_time', align : 'right', width : 80 , editor : { xtype : 'numberfield' } },
		{ header : T('label.idle_time'), dataIndex : 'idle_time', align : 'right', width : 80 , editor : { xtype : 'numberfield' } },
		{ header : T('label.eco_drv_time'), dataIndex : 'eco_drv_time', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.avg_speed'), dataIndex : 'avg_speed', align : 'right', width : 90 , editor : { xtype : 'numberfield' } },
		{ header : T('label.max_speed'), dataIndex : 'max_speed', align : 'right', width : 90 , editor : { xtype : 'numberfield' } },
		{ header : T('label.fuel_consmpt'), dataIndex : 'fuel_consmpt', align : 'right', width : 125 , editor : { xtype : 'numberfield' } },
		{ header : T('label.fuel_effcc'), dataIndex : 'fuel_effcc', align : 'right', width : 80 , editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_accel_cnt'), dataIndex : 'sud_accel_cnt', align : 'right', width : 140 , editor : { xtype : 'numberfield' } },
		{ header : T('label.sud_brake_cnt'), dataIndex : 'sud_brake_cnt', align : 'right', width : 145 , editor : { xtype : 'numberfield' } },
		{ header : T('label.ovr_spd_time'), dataIndex : 'ovr_spd_time', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.co2_emss'), dataIndex : 'co2_emss', align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.max_cool_water_temp'), dataIndex : 'max_cool_water_temp', align : 'right', width : 150 , editor : { xtype : 'numberfield' } },
		{ header : T('label.avg_battery_volt'), dataIndex : 'avg_battery_volt', align : 'right', width : 125 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_10'),  dataIndex : 'spd_lt_10',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_20'),  dataIndex : 'spd_lt_20',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_30'),  dataIndex : 'spd_lt_30',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_40'),  dataIndex : 'spd_lt_40',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_50'),  dataIndex : 'spd_lt_50',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_60'),  dataIndex : 'spd_lt_60',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_70'),  dataIndex : 'spd_lt_70',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_80'),  dataIndex : 'spd_lt_80',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_90'),  dataIndex : 'spd_lt_90',  align : 'right', width : 115 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_100'), dataIndex : 'spd_lt_100', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_110'), dataIndex : 'spd_lt_110', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_120'), dataIndex : 'spd_lt_120', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_130'), dataIndex : 'spd_lt_130', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_140'), dataIndex : 'spd_lt_140', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_150'), dataIndex : 'spd_lt_150', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_160'), dataIndex : 'spd_lt_160', align : 'right', width : 120 , editor : { xtype : 'numberfield' } },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'run_date', xtype : 'daterange' },
			{ fieldLabel : T('label.terminal'), name : 'terminal.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Terminal', valueField : 'name' },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Driver', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});