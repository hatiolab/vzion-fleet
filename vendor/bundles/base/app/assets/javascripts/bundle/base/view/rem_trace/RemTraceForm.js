Ext.define('Base.view.rem_trace.RemTraceForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_rem_trace_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'entity_id', fieldLabel : T('label.x_id', {x : T('label.entity')}), xtype : 'numberfield' },
		{ name : 'entity_type', fieldLabel : T('label.x_type', {x : T('label.entity')}) },
		{ xtype : 'textareafield', name : 'content', fieldLabel : T('label.data'), rows : 8 },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'delete']
	} ]
});