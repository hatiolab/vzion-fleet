/**
 * DriverGroupDetail controller
 */
Ext.define('Fleet.controller.driver_group.DriverGroupItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.DriverGroup', 
		'Fleet.store.DriverGroup', 
		'Fleet.store.DriversByGroup',
		'Fleet.view.driver_group.DriverGroupItem'
	],
	
	mixins : [ 'Frx.mixin.lifecycle.ListLifeCycle' ],
	
	models : ['Fleet.model.DriverGroup'],
			
	stores: ['Fleet.store.DriverGroup', 'Fleet.store.DriversByGroup'],
	
	views : ['Fleet.view.driver_group.DriverGroupItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_driver_group_item' : this.EntryPointWith(this.ListEventHandler())
		});
	},
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	loadItem : function(view, params) {
		var store = view.getStore();
		store.proxy.url = "driver_groups/" + params.id + "/drivers.json";
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
		var url = "driver_groups/" + grid.getParams().id + "/update_groups_drivers.json";
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
			"driver" : { id : 0, name : '', description : '' },
			"_cud_flag_" : "c"
		});
	}
});