Ext.define('Fleet.view.task.TaskItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.task.TaskForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_task_item',
	
	title : T('menu.Task'),
	
	items : [ {
		xtype : 'fleet_task_form'
	} ]
});