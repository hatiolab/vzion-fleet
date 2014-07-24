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
			'fleet_vehicle_track' : this.FormEventHandler()
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
	 * after load item event fired to repair tab 
	 */
	onAfterLoadItemForRepair : function(view, record) {
		this.record = record;
		var store = view.getStore();
		store.proxy.url = "vehicles/" + this.record.get('id') + "/repairs.json";
		store.load();
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
			domain_id : grid.up().getParams().domain_id,
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
		if (newCard.xtype == 'fleet_vehicle_track') {
			var params = { 'trace_time-dt_eq' : Ext.Date.format(new Date(), 'Y-m-d') };
			var searchForm = newCard.down('searchform');
			searchForm.getForm().setValues(params);
			newCard.initMap();
			this.loadTrack(newCard, params);
		}
	},
	
	/**
	 * load vehicle traces for map
	 */
	loadTrack : function(view, params) {
		var store = Ext.create('Fleet.store.VehicleTrace');
		store.load({
			params : {
				'_q[vehicle_id-eq]' : this.record.get('id'),
				'_q[trace_time-dt_eq]' : params['trace_time-dt_eq']
			},
			callback : function(records, operation, success) {
				if(success && records.length > 0) {
					view.refreshTrack(records);
				}
			}
		})
	}
});