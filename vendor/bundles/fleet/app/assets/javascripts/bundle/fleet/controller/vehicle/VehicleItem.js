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
	
	views : ['Fleet.view.vehicle.VehicleItem', 'Fleet.view.vehicle.VehicleRepair', 'Fleet.view.vehicle.VehicleTrack'],
	
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
				after_load_item : this.onAfterLoadItemForTrack
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
	
	onParamsChange : function(view, params) {
		if(params.id) {
			this.callParent(arguments);
		} else {
			var trackView = HF.current.view().child('fleet_vehicle_track');
			this.reloadTrack(trackView);
		}
	},

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
	
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		if (newCard.xtype == 'fleet_vehicle_track') {
			newCard.initMap();
			this.reloadTrack(newCard);
		}
	},
	
	onAfterLoadItemForTrack : function(view, record) {
		this.record = record;
	},
	
	reloadTrack : function(view) {
		work_date = view.down('form').getValues()['work_date-eq']
		if(work_date == '' || work_date == null) {
			work_date = Ext.Date.format(new Date(), 'Y-m-d')
		}
		var store = Ext.create('Fleet.store.VehicleTrace');
		store.load({
			params : {
				'_q[vehicle_id-eq]' : this.record.get('id'),
				'_q[trace_time-dt_eq]' : work_date
			},
			callback : function(records, operation, success) {
				if(success) {
					if(records.length == 0) {
						view.refreshMap();
					} else {
						view.refreshTrack(records);
					}
				}
			}
		})
		
		// this.getVehicleTraceStore().proxy.extraParams = {
		// 	"_q[vehicle_id-eq]" : this.record.get('id'),
		// 	"_q[trace_time-dt_eq]" : work_date
		// };
		// this.getVehicleTraceStore().load();
		// console.log('out');
		// this.getVehicleTraceStore().on('load', function(store, records, success, eOpts) {
		// 	if(records.length == 0) {
		// 		view.refreshMap();
		// 	} else {
		// 		console.log('on');
		// 		view.refreshTrack(records);
		// 	}
		// });
	}
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});