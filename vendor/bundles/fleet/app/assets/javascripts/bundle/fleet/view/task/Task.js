Ext.define('Fleet.view.task.Task', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_task',
	
	title : T('menu.Task'),
	
	store : 'Fleet.store.Task',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
	]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});