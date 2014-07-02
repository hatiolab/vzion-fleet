/**
 * VehicleGroupDetail controller
 */
Ext.define('Fleet.controller.vehicle_group.VehicleGroupItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.VehicleGroup', 
		'Fleet.store.VehicleGroup', 
		'Fleet.store.VehiclesByGroup',
		'Fleet.view.vehicle_group.VehicleGroupItem'
	],
	
	mixins : [ 'Frx.mixin.lifecycle.ListLifeCycle' ],
	
	models : ['Fleet.model.VehicleGroup'],
			
	stores: ['Fleet.store.VehicleGroup', 'Fleet.store.VehiclesByGroup'],
	
	views : ['Fleet.view.vehicle_group.VehicleGroupItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle_group_item' : this.EntryPointWith(this.ListEventHandler())
		});
	},
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	loadItem : function(view, params) {
		var store = view.getStore();
		store.proxy.url = "vehicle_groups/" + params.id + "/vehicles.json";
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
		var url = "vehicle_groups/" + grid.getParams().id + "/update_groups_vehicles.json";
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
			"vehicle" : { id : 0, name : '', description : '' },
			"_cud_flag_" : "c"
		});
	}

});