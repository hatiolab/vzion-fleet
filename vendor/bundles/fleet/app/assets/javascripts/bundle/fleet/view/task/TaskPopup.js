Ext.define('Fleet.view.task.TaskPopup', {

	extend : 'Frx.common.Popup',
	
 	requires : [ 
		'Fleet.view.task.TaskForm'
	],	

	xtype : 'fleet_task_popup',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},	

	title : T('menu.TaskCalendar'),
	
	height : 470,

	items : [ {
		xtype : 'fleet_task_form',
	} ]
});