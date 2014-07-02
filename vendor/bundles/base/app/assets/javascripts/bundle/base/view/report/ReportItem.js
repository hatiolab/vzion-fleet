Ext.define('Base.view.report.ReportItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.report.ReportForm',
		'Base.view.report.ReportPreview'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_report_item',
	
	title: T('menu.Report'),
	
	items : [ {
		xtype : 'base_report_form'
	}, {
		xtype : 'base_report_preview'
	}, {
		xtype : 'base_property_form'
	}, {
		xtype : 'base_attachment_form'
	} ]
});