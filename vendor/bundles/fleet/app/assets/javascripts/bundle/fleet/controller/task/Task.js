/**
 * Task controller
 */
Ext.define('Fleet.controller.task.Task', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Task', 
		'Fleet.store.Task', 
		'Fleet.view.task.Task' 
	],
	
	models : ['Fleet.model.Task'],
			
	stores: ['Fleet.store.Task'],
	
	views : ['Fleet.view.task.Task'],
	
	refs: [ { ref : 'Task', selector : 'fleet_task' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_task' : this.EntryPoint(),
			'fleet_task #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});