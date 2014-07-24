Ext.define('Fleet.view.task.TaskForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_task_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'title', fieldLabel : T('label.title') },
		{ xtype : 'datefield', name : 'start_date', fieldLabel : T('label.x_date', {x : T('label.start')}), format : T('format.date') },
		{ xtype : 'datefield', name : 'end_date', fieldLabel : T('label.x_date', {x : T('label.end')}), format : T('format.date') },
		{ name : 'all_day', fieldLabel : T('label.all_day'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'category', fieldLabel : T('label.category') },
		{ name : 'reminder', fieldLabel : T('label.reminder') },
		{ name : 'notes', fieldLabel : T('label.notes') },
		{ name : 'loc', fieldLabel : T('label.loc') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save']
	} ]
});