/**
 * LocationAlarmDetail controller
 */
Ext.define('Fleet.controller.location_alarm.LocationAlarmItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.LocationAlarm', 
		'Fleet.store.LocationAlarm', 
		'Fleet.view.location_alarm.LocationAlarmItem',
		'Fleet.view.location_alarm.LocationAlarmVehicle'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle', 'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	models : ['Fleet.model.LocationAlarm', 'Fleet.model.LocationAlarmVehicle'],
			
	stores: ['Fleet.store.LocationAlarm', 'Fleet.store.LocationAlarmVehicle'],
	
	views : ['Fleet.view.location_alarm.LocationAlarmItem', 'Fleet.view.location_alarm.LocationAlarmVehicle'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location_alarm_item' : this.EntryPoint(),
			'fleet_location_alarm_form' : this.FormEventHandler(),
			'fleet_location_alarm_vehicle' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemForLocationAlarmVehicle
			})
		});
	},
	
	onAfterLoadItemForLocationAlarmVehicle : function(view, record) {
		this.record = record;
		var store = view.getStore();
		store.proxy.url = "location_alarms/" + this.record.get('id') + "/location_alarm_vehicles.json";
		store.load();
	},
	
	/**
	 * override
	 */
	getUpdateListUrl : function(grid) {
		if(grid.xtype == 'fleet_location_alarm_vehicle') {
			return "location_alarms/" + HF.current.resource().id + "/update_location_alarm_vehicles.json";
		} else {
			return '';
		}
	},
	
	/**
	 * override
	 */
	newRecord : function(grid) {
		return Ext.create(grid.getStore().model, {
			id : null,
			domain_id : this.record.get('domain_id'),
			location_alarm_id : this.record.get('id'),
			vehicle_id : HF.current.resource().id,
			alarm_name : this.record.get('name'),
			_cud_flag_ : 'c'
		});
	}
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});