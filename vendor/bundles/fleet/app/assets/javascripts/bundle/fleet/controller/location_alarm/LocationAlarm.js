/**
 * LocationAlarm controller
 */
Ext.define('Fleet.controller.location_alarm.LocationAlarm', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.LocationAlarm', 
		'Fleet.store.LocationAlarm', 
		'Fleet.view.location_alarm.LocationAlarm' 
	],
	
	models : ['Fleet.model.LocationAlarm'],
			
	stores: ['Fleet.store.LocationAlarm'],
	
	views : ['Fleet.view.location_alarm.LocationAlarm'],
	
	refs: [ { ref : 'LocationAlarm', selector : 'fleet_location_alarm' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location_alarm' : this.EntryPoint(),
			'fleet_location_alarm #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});