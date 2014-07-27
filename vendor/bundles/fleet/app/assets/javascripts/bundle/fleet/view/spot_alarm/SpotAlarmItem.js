Ext.define('Fleet.view.spot_alarm.SpotAlarmItem', {

	extend : 'Ext.tab.Panel',

 	requires : [ 
		'Fleet.view.spot_alarm.SpotAlarmForm',
		'Fleet.view.spot_alarm.SpotAlarmVehicle'
	],

	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},

	xtype : 'fleet_spot_alarm_item',

	title : T('menu.SpotAlarm'),

	items : [ {
		xtype : 'fleet_spot_alarm_form'
	}, {
		xtype : 'fleet_spot_alarm_vehicle'
	} ]
});