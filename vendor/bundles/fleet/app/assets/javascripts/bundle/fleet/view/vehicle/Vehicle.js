Ext.define('Fleet.view.vehicle.Vehicle', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle',
	
	title : T('menu.Vehicle'),
	
	store : 'Fleet.store.Vehicle',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.reg_no'), dataIndex : 'name', allowBlank : false, editor : { xtype : 'textfield', minLength : 3, maxLenth : 32 } },
		{ header : T('label.description'), dataIndex : 'description', width : 150, editor : { xtype : 'textfield', maxLength : 255 } },
		{ header : T('label.model'), dataIndex : 'model' , editor : { xtype : 'textfield' } },
		{ header : T('label.vendor'), dataIndex : 'vendor', editor : { xtype : 'codecombo', commonCode : 'V_VENDOR' } },
		{ header : T('label.classicfication'), dataIndex : 'classicfication', width : 105, editor : { xtype : 'codecombo', commonCode : 'V_CLASS' } },
		{ header : T('label.fuel_type'), dataIndex : 'fuel_type', width : 80, editor : { xtype : 'codecombo', commonCode : 'V_FUEL' } },
		{ header : T('label.ownership'), dataIndex : 'ownership', width : 90, editor : { xtype : 'codecombo', commonCode : 'V_OWNERSHIP' } },
		{ header : T('label.birth_year'), dataIndex : 'birth_year', width : 80, align : 'right' , editor : { xtype : 'numberfield', minValue : 1900, maxValue : 2100 } },
		{ header : T('label.seat_size'), dataIndex : 'seat_size', width : 75, align : 'right' , editor : { xtype : 'numberfield', minValue : 1, maxValue : 100 } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.reg_no'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ fieldLabel : T('label.model'), name : 'model-like' },
			{ fieldLabel : T('label.vendor'), name : 'vendor-eq', xtype : 'codesearchcombo', commonCode : 'V_VENDOR', valueField : 'name', displayField : 'name' },
			{ fieldLabel : T('label.classicfication'), name : 'classicfication-eq', xtype : 'codesearchcombo', commonCode : 'V_CLASS', valueField : 'name', displayField : 'name' },
			{ fieldLabel : T('label.fuel_type'), name : 'fuel_type-eq', xtype : 'codesearchcombo', commonCode : 'V_FUEL', valueField : 'name', displayField : 'name' },
			{ fieldLabel : T('label.ownership'), name : 'ownership-eq', xtype : 'codesearchcombo', commonCode : 'V_OWNERSHIP', valueField : 'name', displayField : 'name' },
			{ fieldLabel : T('label.birth_year'), name : 'birth_year-eq', xtype : 'numberfield', minValue : 1900, maxValue : 2100 },
			{ fieldLabel : T('label.seat_size'), name : 'seat_size-eq', xtype : 'numberfield', minValue : 1, maxValue : 100 }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});