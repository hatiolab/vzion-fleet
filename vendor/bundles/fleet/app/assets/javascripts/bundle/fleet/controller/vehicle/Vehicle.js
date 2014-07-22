/**
 * Vehicle controller
 */
Ext.define('Fleet.controller.vehicle.Vehicle', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Vehicle', 
		'Fleet.store.Vehicle', 
		'Fleet.view.vehicle.Vehicle' 
	],
	
	models : ['Fleet.model.Vehicle'],
			
	stores: ['Fleet.store.Vehicle'],
	
	views : ['Fleet.view.vehicle.Vehicle'],
	
	refs: [ { ref : 'Vehicle', selector : 'fleet_vehicle' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_vehicle' : this.EntryPoint({
				click_simulation : this.onSimulation
			}),
			'fleet_vehicle #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
	
	onGotoItem : function(grid, td, rowIndex, colIndex, event, record, tr) {
		HF.show(Ext.getClassName(grid.up()) + 'Item', {id : record.get('id'), domain_id : record.get('domain_id')})
	},
	
	onSimulation : function() {
    	Ext.Ajax.request({
		    url : 'vehicles/simulation_service.json',
		    method : 'GET',
		    success : function(response) {
				HF.current.view().store.reload();
			},
			scope : this
		});
	}

});