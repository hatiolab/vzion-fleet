/**
 * TaskDetail controller
 */
Ext.define('Fleet.controller.task.TaskItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Task', 
		'Fleet.store.Task', 
		'Fleet.view.task.TaskItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Task'],
			
	stores: ['Fleet.store.Task'],
	
	views : ['Fleet.view.task.TaskItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_task_item' : this.EntryPoint(),
			'fleet_task_form' : this.FormEventHandler()
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