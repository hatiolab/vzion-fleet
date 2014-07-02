Ext.define('Fleet.view.location.Location', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_location',
	
	title : T('menu.Location'),
	
	store : 'Fleet.store.Location',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name', allowBlank : false, width : 120, editor : { xtype : 'textfield' } },
		{ header : T('label.description'), dataIndex : 'description', width : 150, editor : { xtype : 'textfield' } },
		{ header : T('label.address'), dataIndex : 'address', width : 200, editor : { xtype : 'textfield', minValue : 0 } },
		{ header : T('label.radius') + ' (km)', dataIndex : 'radius', width : 90, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lat'), dataIndex : 'lat', width : 75, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lng'), dataIndex : 'lng', width : 80, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lat_hi'), dataIndex : 'lat_hi', width : 100, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lat_low'), dataIndex : 'lat_low', width : 100, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lng_hi'), dataIndex : 'lng_hi', width : 105, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.lng_low'), dataIndex : 'lng_low', width : 105, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
			{ fieldLabel : T('label.description'), name : 'description-like' },
			{ fieldLabel : T('label.address'), name : 'address-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});