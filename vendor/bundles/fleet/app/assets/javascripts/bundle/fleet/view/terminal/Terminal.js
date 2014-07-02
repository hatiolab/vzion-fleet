Ext.define('Fleet.view.terminal.Terminal', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_terminal',
	
	title : T('menu.Terminal'),
	
	store : 'Fleet.store.Terminal',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.reg_no'), dataIndex : 'name' , editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', width : 150, editor : { xtype : 'textfield' } },
		{ header : T('label.x_date', {x : T('label.purchase')}), dataIndex : 'purchase_date', xtype : 'datecolumn', format : T('format.date'), width : 120, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' } },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), dataIndex : 'vehicle',
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Driver' } },
		{ 
			header : T('label.x_desc', {x : T('label.driver')}), dataIndex : 'driver',
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.reg_no'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ fieldLabel : T('label.x_date', {x : T('label.purchase')}), name : 'purchase_date', xtype : 'daterange' },
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.driver'), name : 'driver.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Driver', valueField : 'name' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});