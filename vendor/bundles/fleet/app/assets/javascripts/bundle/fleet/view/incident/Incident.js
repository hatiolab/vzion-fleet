Ext.define('Fleet.view.incident.Incident', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_incident',
	
	title : T('menu.Incident'),
	
	store : 'Fleet.store.Incident',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.confirm'), dataIndex : 'confirm', xtype : 'checkcolumn', width : 70 },
		{ header : T('label.terminal'), dataIndex : 'terminal', xtype : 'entitycolumn' },
		{ 
			header : T('label.x_desc', {x : T('label.terminal')}), dataIndex : 'terminal', width : 120,
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn' },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), dataIndex : 'vehicle', width : 120,
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn' },
		{ 
			header : T('label.x_desc', {x : T('label.driver')}), dataIndex : 'driver', width : 120,
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.lat'), dataIndex : 'lat', align : 'right', width : 75 },
		{ header : T('label.lng'), dataIndex : 'lng', align : 'right', width : 80 },
		{ header : T('label.velocity'), dataIndex : 'velocity', align : 'right', width : 70 },
		{ header : T('label.impulse_x', {x : 'X'}), dataIndex : 'impulse_x', align : 'right', width : 85 },
		{ header : T('label.impulse_x', {x : 'Y'}), dataIndex : 'impulse_y', align : 'right', width : 85 },
		{ header : T('label.impulse_x', {x : 'Z'}), dataIndex : 'impulse_z', align : 'right', width : 85 },
		{ header : T('label.impulse_abs'), dataIndex : 'impulse_abs', align : 'right', width : 100 },
		{ header : T('label.impulse_threshold'), dataIndex : 'impulse_threshold', align : 'right', width : 135 },
		{ header : T('label.engine_temp'), dataIndex : 'engine_temp', align : 'right', width : 100 },
		{ header : T('label.engine_temp_threshold'), dataIndex : 'engine_temp_threshold', align : 'right', width : 160 },
		{ header : T('label.obd'), dataIndex : 'obd_connected', xtype : 'checkcolumn', width : 45 },
		{ header : T('label.video'), dataIndex : 'video_clip', editor : { xtype : 'textfield' }, width : 200 },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 130 }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'created_at', xtype : 'daterange', format : T('format.date') },
			{ fieldLabel : T('label.terminal'), name : 'terminal.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Terminal', valueField : 'name' },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Driver', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});