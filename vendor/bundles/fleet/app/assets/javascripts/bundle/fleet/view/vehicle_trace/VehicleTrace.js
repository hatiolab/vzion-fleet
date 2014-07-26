Ext.define('Fleet.view.vehicle_trace.VehicleTrace', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_trace',
	
	title : T('menu.VehicleTrace'),
	
	store : 'Fleet.store.VehicleTrace',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.terminal'), dataIndex : 'terminal', xtype : 'entitycolumn', flex : 1, editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Terminal' } },
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn', flex : 1, editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Driver' } },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn', flex : 1, editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' } },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), 
			dataIndex : 'vehicle', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.lat'), dataIndex : 'lat', width : 75, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lng'), dataIndex : 'lng', width : 85, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.velocity'), dataIndex : 'velocity', width : 70, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.trace_time'), dataIndex : 'trace_time', width : 120, editor : { xtype : 'datefield', format : T('format.datetime') } },
	],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'trace_time-dt_eq', xtype : 'datefield', format : T('format.date'), submitFormat : 'Y-m-d' },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['simulation', '->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});