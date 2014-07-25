Ext.define('Fleet.view.driver_speed_sum.DriverSpeedSum', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_driver_speed_sum',
	
	title : T('menu.DriverSpeedSum'),
	
	store : 'Fleet.store.DriverSpeedSum',
	
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
		{ header : T('label.spd_lt_10'),  dataIndex : 'spd_lt_10',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_20'),  dataIndex : 'spd_lt_20',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_30'),  dataIndex : 'spd_lt_30',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_40'),  dataIndex : 'spd_lt_40',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_50'),  dataIndex : 'spd_lt_50',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_60'),  dataIndex : 'spd_lt_60',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_70'),  dataIndex : 'spd_lt_70',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_80'),  dataIndex : 'spd_lt_80',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_90'),  dataIndex : 'spd_lt_90',  xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_100'), dataIndex : 'spd_lt_100', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_110'), dataIndex : 'spd_lt_110', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_120'), dataIndex : 'spd_lt_120', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_130'), dataIndex : 'spd_lt_130', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_140'), dataIndex : 'spd_lt_140', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_150'), dataIndex : 'spd_lt_150', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_160'), dataIndex : 'spd_lt_160', xtype : 'numbercolumn', format : T('format.number'), width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.year'), name : 'run_year-eq', xtype : 'numberfield', minValue : 2010, maxValue : 2100 },
			{ fieldLabel : T('label.month'), name : 'run_month-eq', xtype : 'numberfield', minValue : 1, maxValue : 12 },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Driver', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});