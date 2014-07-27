/**
 * SpotAlarmDetail controller
 */
Ext.define('Fleet.controller.spot_alarm.SpotAlarmItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.SpotAlarm', 
		'Fleet.store.SpotAlarm', 
		'Fleet.view.spot_alarm.SpotAlarmItem',
		'Fleet.view.spot_alarm.SpotAlarmVehicle'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle', 'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	models : ['Fleet.model.SpotAlarm', 'Fleet.model.SpotAlarmVehicle'],
			
	stores: ['Fleet.store.SpotAlarm', 'Fleet.store.SpotAlarmVehicle'],
	
	views : ['Fleet.view.spot_alarm.SpotAlarmItem', 'Fleet.view.spot_alarm.SpotAlarmVehicle'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_spot_alarm_item' : this.EntryPoint(),
			'fleet_spot_alarm_form' : this.FormEventHandler(),
			'fleet_spot_alarm_vehicle' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemForSpotAlarmVehicle
			})
		});
	},
	
	onAfterLoadItemForSpotAlarmVehicle : function(view, record) {
		this.record = record;
		var store = view.getStore();
		store.proxy.url = "spot_alarms/" + this.record.get('id') + "/spot_alarm_vehicles.json";
		store.load();
	},
	
	/**
	 * override
	 */
	getUpdateListUrl : function(grid) {
		if(grid.xtype == 'fleet_spot_alarm_vehicle') {
			return "spot_alarms/" + HF.current.resource().id + "/update_spot_alarm_vehicles.json";
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
			spot_alarm_id : this.record.get('id'),
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