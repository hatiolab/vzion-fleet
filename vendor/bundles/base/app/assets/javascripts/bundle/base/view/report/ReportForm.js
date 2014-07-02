Ext.define('Base.view.report.ReportForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_report_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'template_url', fieldLabel : T('label.template'), disabled : true },
		{
	        xtype: 'filefield',
	        name: 'template',
	        fieldLabel: T('button.new') + ' ' + T('label.template'),
	        msgTarget: 'side',
	        // allowBlank: false,
	        buttonText: T('text.Select Template to Upload')
	    },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});