Ext.define('Fleet.view.location_alarm.LocationAlarm', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_location_alarm',
	
	title : T('menu.LocationAlarm'),
	
	store : 'Fleet.store.LocationAlarm',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.name'), dataIndex : 'name' , editor : { xtype : 'textfield' } , sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.type'), dataIndex : 'transfer_type', editor : { xtype : 'codecombo', commonCode : 'TRANSFER_TYPE' } },
		{ header : T('label.evt_type'), dataIndex : 'evt_type', editor : { xtype : 'codecombo', commonCode : 'EVENT_TYPE' } },
		{ header : T('label.evt_name'), dataIndex : 'evt_name' , editor : { xtype : 'textfield' } },
		{ header : T('label.evt_trg'), dataIndex : 'evt_trg', editor : { xtype : 'codecombo', commonCode : 'EVENT_TRIGGER' } },
		{ header : T('label.always'), dataIndex : 'always' , xtype : 'checkcolumn' },
		{ header : T('label.enabled'), dataIndex : 'enabled' , xtype : 'checkcolumn' },
		{ header : T('label.from_date'), dataIndex : 'from_date', xtype : 'datecolumn', format : T('format.date'), editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.to_date'), dataIndex : 'to_date', xtype : 'datecolumn', format : T('format.date'), editor : { xtype : 'datefield', format : T('format.date') } },

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