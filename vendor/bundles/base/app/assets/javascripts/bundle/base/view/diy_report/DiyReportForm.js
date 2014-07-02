Ext.define('Base.view.diy_report.DiyReportForm', {
	
	extend : 'Ext.form.Panel',
	
	requires : 'Base.store.DiySelection',
	
	xtype : 'base_diy_report_form',
	
	title : T('title.basic_info'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name') },
		{ name : 'description', fieldLabel : T('label.description') },
		{ 
			name : 'diy_selection', 
			fieldLabel : T('menu.DiySelection'), 
			xtype : 'entityfield', 
			storeClass : 'Base.store.DiySelection',
			allowBlank : false
		},
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'generate_view', 'save', 'delete']
	} ]
	
});