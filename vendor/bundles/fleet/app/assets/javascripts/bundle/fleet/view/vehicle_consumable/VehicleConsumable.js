Ext.define('Fleet.view.vehicle_consumable.VehicleConsumable', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_consumable',
	
	title : T('menu.VehicleConsumable'),
	
	store : 'Fleet.store.VehicleConsumable',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' } },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), dataIndex : 'vehicle', width : 150,
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.code'), dataIndex : 'name', width: 120, editor : { xtype : 'textfield' } },
		//{ header : T('label.description'), dataIndex : 'description', width : 150, editor : { xtype : 'textfield' } },
		{ header : T('label.status'), dataIndex : 'status', width : 85, editor : { xtype : 'codecombo', commonCode : 'HEALTH_STATUS' } },
		{ header : T('label.health_rate'), dataIndex : 'health_rate', width : 120, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.cycle_repl_mile'), dataIndex : 'cycle_repl_mile', width : 115, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.cycle_repl_duration'), dataIndex : 'cycle_repl_duration', width : 140, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.last_repl_date'), dataIndex : 'last_repl_date', xtype : 'datecolumn', format : T('format.date'), width : 110, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.last_repl_mile'), dataIndex : 'last_repl_mile', align : 'right', width : 130, editor : { xtype : 'numberfield' } },
		{ header : T('label.next_repl_date'), dataIndex : 'next_repl_date', xtype : 'datecolumn', format : T('format.date'), width : 115, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.next_repl_mile'), dataIndex : 'next_repl_mile', align : 'right', width : 135, editor : { xtype : 'numberfield' } },
		{ header : T('label.repl_unit'), dataIndex : 'repl_unit', width : 90, editor : { xtype : 'codecombo', commonCode : 'REPLACE_UNIT' } },		
		{ header : T('label.cumulative_cost'), dataIndex : 'cumulative_cost', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.code'), name : 'name-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});