Ext.define('Fleet.view.vehicle_speed_sum.VehicleSpeedSum', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_speed_sum',
	
	title : T('menu.VehicleSpeedSum'),
	
	store : 'Fleet.store.VehicleSpeedSum',
	
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
		{ header : T('label.spd_lt_10'),  dataIndex : 'spd_lt_10',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_20'),  dataIndex : 'spd_lt_20',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_30'),  dataIndex : 'spd_lt_30',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_40'),  dataIndex : 'spd_lt_40',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_50'),  dataIndex : 'spd_lt_50',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_60'),  dataIndex : 'spd_lt_60',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_70'),  dataIndex : 'spd_lt_70',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_80'),  dataIndex : 'spd_lt_80',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_90'),  dataIndex : 'spd_lt_90',  width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_100'), dataIndex : 'spd_lt_100', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_110'), dataIndex : 'spd_lt_110', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_120'), dataIndex : 'spd_lt_120', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_130'), dataIndex : 'spd_lt_130', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_140'), dataIndex : 'spd_lt_140', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_150'), dataIndex : 'spd_lt_150', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.spd_lt_160'), dataIndex : 'spd_lt_160', width : 120, align : 'right' , editor : { xtype : 'numberfield' } }
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