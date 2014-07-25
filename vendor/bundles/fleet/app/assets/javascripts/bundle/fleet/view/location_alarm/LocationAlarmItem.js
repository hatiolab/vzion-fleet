Ext.define('Fleet.view.location_alarm.LocationAlarmItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.location_alarm.LocationAlarmForm',
		'Fleet.view.location_alarm.LocationAlarmVehicle'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_location_alarm_item',
	
	title : T('menu.LocationAlarm'),
	
	items : [ {
		xtype : 'fleet_location_alarm_form'
	}, {
		xtype : 'fleet_location_alarm_vehicle'
	} ]
});