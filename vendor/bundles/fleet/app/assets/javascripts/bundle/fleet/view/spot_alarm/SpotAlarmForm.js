Ext.define('Fleet.view.spot_alarm.SpotAlarmForm', {

	extend : 'Ext.form.Panel',

	xtype : 'fleet_spot_alarm_form',

	title : T('title.basic_info'),

	autoScroll : true,

	defaults : { xtype : 'textfield', anchor : '100%' },

	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'transfer_type', fieldLabel : T('label.type'), xtype : 'codefield', commonCode : 'TRANSFER_TYPE' },
		{ name : 'evt_type', fieldLabel : T('label.evt_type'), xtype : 'codefield', commonCode : 'EVENT_TYPE' },
		{ name : 'evt_name', fieldLabel : T('label.evt_name') },
		{ name : 'evt_trg', fieldLabel : T('label.evt_trg'), xtype : 'codefield', commonCode : 'EVENT_TRIGGER' },
		{ name : 'always', fieldLabel : T('label.always'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'enabled', fieldLabel : T('label.enabled'), xtype : 'checkboxfield', inputValue : true },
		{ xtype : 'datefield', name : 'from_date', fieldLabel : T('label.from_date'), format : T('format.date') },
		{ xtype : 'datefield', name : 'to_date', fieldLabel : T('label.to_date'), format : T('format.date') },
		{ xtype : 'timestamp' }
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});