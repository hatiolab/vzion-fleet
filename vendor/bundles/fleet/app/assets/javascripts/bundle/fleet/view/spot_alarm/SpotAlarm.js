Ext.define('Fleet.view.spot_alarm.SpotAlarm', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_spot_alarm',
	
	title : T('menu.SpotAlarm'),
	
	store : 'Fleet.store.SpotAlarm',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name' , editor : { xtype : 'textfield' } },
		{ header : T('label.type'), dataIndex : 'transfer_type', editor : { xtype : 'codecombo', commonCode : 'TRANSFER_TYPE' } },
		{ header : T('label.evt_type'), dataIndex : 'evt_type', editor : { xtype : 'codecombo', commonCode : 'EVENT_TYPE' } },
		{ header : T('label.evt_name'), dataIndex : 'evt_name', editor : { xtype : 'textfield' } },
		{ header : T('label.evt_trg'), dataIndex : 'evt_trg', width : 105, editor : { xtype : 'codecombo', commonCode : 'EVENT_TRIGGER' } },
		{ header : T('label.always'), dataIndex : 'always', width : 110, xtype : 'checkcolumn' },
		{ header : T('label.enabled'), dataIndex : 'enabled', width : 70, xtype : 'checkcolumn' },
		{ header : T('label.from_date'), dataIndex : 'from_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.to_date'), dataIndex : 'to_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.name'), name : 'name-like' },
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});