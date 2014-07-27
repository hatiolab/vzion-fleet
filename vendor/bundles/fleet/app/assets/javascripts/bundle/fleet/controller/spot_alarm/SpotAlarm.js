/**
 * SpotAlarm controller
 */
Ext.define('Fleet.controller.spot_alarm.SpotAlarm', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.SpotAlarm', 
		'Fleet.store.SpotAlarm', 
		'Fleet.view.spot_alarm.SpotAlarm' 
	],
	
	models : ['Fleet.model.SpotAlarm'],
			
	stores: ['Fleet.store.SpotAlarm'],
	
	views : ['Fleet.view.spot_alarm.SpotAlarm'],
	
	refs: [ { ref : 'SpotAlarm', selector : 'fleet_spot_alarm' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_spot_alarm' : this.EntryPoint(),
			'fleet_spot_alarm #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});