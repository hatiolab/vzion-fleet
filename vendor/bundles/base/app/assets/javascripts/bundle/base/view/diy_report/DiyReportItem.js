Ext.define('Base.view.diy_report.DiyReportItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.diy_report.DiyReportForm',
		'Base.view.diy_report.DiyReportInParams',
		'Base.view.diy_report.DiyReportOutParams',
		'Base.view.diy_report.DiyReportTest'
	],
	
	xtype : 'base_diy_report_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.DiyReport'),
	
	items : [ {
		xtype : 'base_diy_report_form'
	}, {
		xtype : 'base_diy_report_in_params'
	}, {
		xtype : 'base_diy_report_out_params'
	}, {
		xtype : 'base_diy_report_test'
	} ]
	
});
