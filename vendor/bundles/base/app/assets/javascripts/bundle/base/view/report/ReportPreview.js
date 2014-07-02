Ext.define('Base.view.report.ReportPreview', {
	extend : 'Ext.form.Panel',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_report_preview',
	
	layout : 'border',
	
	title : T('title.preview'),
	
	items : [{
		xtype : 'hidden',
		name : 'template_url'
	}, {
		xtype: "birtviewer",
		flex : 1,
		protocol : 'http',
		host : 'localhost',
		port : 8080,
		contextPath : 'Birt',
		viewerType : 'preview',
		params : {
			sample : 1,
			Cust : 12
		}
	}],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['print', '->', 'list', 'preview']
	} ]
});
