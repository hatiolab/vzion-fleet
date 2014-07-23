/**
 * VehicleDetail controller
 */
Ext.define('Fleet.controller.vehicle.VehicleItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Vehicle', 
		'Fleet.store.Vehicle', 
		'Fleet.view.vehicle.VehicleItem',
		'Fleet.view.vehicle.VehicleRepair',
		'Fleet.view.vehicle.VehicleTrack'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle'
	],
	
	models : ['Fleet.model.Vehicle', 'Fleet.model.VehicleRepair'],
			
	stores: ['Fleet.store.Vehicle', 'Fleet.store.VehicleRepair', 'Fleet.store.VehicleTrace'],
	
	views : ['Fleet.view.vehicle.VehicleItem', 'Fleet.view.vehicle.VehicleRepair'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_item' : this.EntryPoint({
				tabchange : this.onTabChange
			}),
			'fleet_vehicle_form' : this.FormEventHandler(),
			'fleet_vehicle_repair' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemForRepair
			}),
			'fleet_vehicle_track' : this.FormEventHandler({
				after_load_item : this.onAfterLoadItemTrack
			})
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	onAfterLoadItemForRepair : function(view, record) {
		var store = view.getStore();
		store.proxy.url = "vehicles/" + record.get('id') + "/repairs.json";
		store.load({
			callbask : function(records, operation, success) {
				if(success) {
					view.fireEvent('after_load_list', view, records, operation);
				}
			}
		});
	},
	
	/**
	 * multiple update url을 리턴 
	 */
	getUpdateListUrl : function(grid) {
		var url = "vehicles/" + HF.current.resource().id + "/update_vehicle_repairs.json";
		return url;
	},

	/**
	 * after grid updated
	 */
	onAfterUpdateList : function(grid, updateType, response) {
		grid.getStore().reload();
	},	
	
	/**
	 * 모델 생성
	 *
	 * @grid
	 */
	newRecord : function(grid) {
		return Ext.create(grid.getStore().model, {
			"id" : null,
			"domain_id" : grid.up().getParams().domain_id,
			"vehicle_id" : HF.current.resource().id,
			"next_repair_date" : '',
			"repair_date" : '',
			"repair_man" : '',
			"repair_mileage" : '',
			"repair_shop" : '',
			"repair_time" : '',
			"cost" : '',
			"content" : '',
			"comment" : '',
			"oos" : '',
			"_cud_flag_" : "c"
		});
	},
	
	onAfterLoadItemTrack : function(view, record) {
		
	},
	
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		if (newCard.xtype == 'fleet_vehicle_track') {
			newCard.initMap(37.38,127.11);
			newCard.refreshMap(new google.maps.LatLng(37.38, 127.11));
			// newCard.getMap();
			// newCard.onInit();
			// this.getVehicleTraceStore().proxy.extraParams = { "_q[vehicle_id-eq]" : HF.current.view().getParams().id, "_q[trace_time-gte]" : "", "_q[trace_time-lte]" : "" };
			// this.getVehicleTraceStore().on('load', function(records, operation, success) {
			// 	if(success) {
			// 		newCard.refreshMap(records);
			// 	}
			// });
		}
	},
	
	getVehicleTraceStore : function() {
		if(!this.trackStore) {
			this.trackStore = Ext.create('Fleet.store.VehicleTracking');
		}
		
		return this.trackStore;
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});