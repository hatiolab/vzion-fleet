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
			'fleet_vehicle_repair' : this.ListEventHandler(),
			'fleet_vehicle_track' : this.FormEventHandler(),
			'fleet_vehicle_consumable' : this.ListEventHandler(),
			'fleet_vehicle_consumable #item_grid' : {
				itemclick : this.onConsumableItemClick,
				cellclick : this.onConsumableCellClick
			}
		});
	},

	/**
	 * override
	 */
	onParamsChange : function(view, params) {
		if(params.id) {
			this.callParent(arguments);
			view.setActiveTab(0);
		} else {
			var trackView = HF.current.view().child('fleet_vehicle_track');
			this.loadTrack(trackView, params);
		}
	},
	
	/**
	 * 현재 선택된 vehicle record 정보를 리턴한다.
	 */
	getRecord : function() {
		return HF.current.view().child('fleet_vehicle_form').getRecord();
	},
	
	/**
	 * override
	 */
	getUpdateListUrl : function(grid) {
		if(grid.xtype == 'fleet_vehicle_repair') {
			return "vehicles/" + HF.current.resource().id + "/update_vehicle_repairs.json";
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
			vehicle_id : HF.current.resource().id,
			next_repair_date : '',
			repair_date : '',
			repair_man : '',
			repair_mileage : '',
			repair_shop : '',
			repair_time : '',
			cost : '',
			content : '',
			comment : '',
			oos : '',
			_cud_flag_ : 'c'
		});
	},
	
	/**
	 * tab 변경시
	 */
	onTabChange : function(tabPanel, newCard, oldCard, eOpts) {
		
		// 1. track tab
		if (newCard.xtype == 'fleet_vehicle_track') {
			var params = { 'trace_time-dt_eq' : Ext.Date.format(new Date(), 'Y-m-d') };
			var searchForm = newCard.down('searchform');
			searchForm.getForm().setValues(params);
			newCard.initMap();
			this.loadTrack(newCard, params);
			
		// 2. consumable tab
		} else if (newCard.xtype == 'fleet_vehicle_consumable') {
			var store = newCard.child(' #item_grid').getStore();
			store.proxy.extraParams = { '_q[vehicle_id-eq]' : this.getRecord().get('id') };
			store.load();
			
		// 3. repair tab
		} else if (newCard.xtype == 'fleet_vehicle_repair') {
			var store = newCard.getStore();
			store.proxy.url = "vehicles/" + this.getRecord().get('id') + "/repairs.json";
			store.load();
		}
	},
	
	/**
	 * load vehicle traces for map
	 */
	loadTrack : function(view, params) {
		var store = Ext.create('Fleet.store.VehicleTrace');
		store.load({
			params : {
				'_q[vehicle_id-eq]' : this.getRecord().get('id'),
				'_q[trace_time-dt_eq]' : params['trace_time-dt_eq']
			},
			callback : function(records, operation, success) {
				if(success && records.length > 0) {
					view.refreshTrack(records);
				}
			}
		})
	},
	
	/**
	 * consumable item grid click시 
	 */
	onConsumableItemClick : function(row, record, item, index, e, eOpts) {
		var consumableView = HF.current.view().child('fleet_vehicle_consumable');
		consumableView.down('form').loadRecord(record);
		var histStore = consumableView.child('#consumable_hist_grid').getStore();
		histStore.proxy.url = "vehicle_consumables/" + record.get('id') + "/consumable_hists";
		histStore.load();
	},
	
	/**
	 * consumable cell click시 
	 */
	onConsumableCellClick : function(table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		if(cellIndex == 4) {
		} else if(cellIndex == 5) {
			HF.msg.confirm({
				msg : T('text.Sure to Save'),
				fn : function(btn) {
					if(btn == 'yes') {
						this.doTransaction('vehicle_consumables/transaction.json', 'model', 'replace_consumable', 'instance', record.get('id'), this.refreshVehicleConsumable);
					}
				},
				scope: this
			});
		}
	},
	
	refreshVehicleConsumable : function() {
		var store = HF.current.view().child(' #item_grid').getStore();
		store.proxy.extraParams = { '_q[vehicle_id-eq]' : this.getRecord().get('id') };
		store.load();
	},
	
	doTransaction : function(url, callType, tranName, logicType, instanceId, callbackFunc) {
    	Ext.Ajax.request({
		    url : url,
		    method : 'POST',
			params : { 
				call_type : callType,
				tran_name : tranName, 
				logic_type : logicType, 
				instance_id : instanceId
			},
		    success : callbackFunc,
			scope : this
		});
	}
});