Ext.define('Base.view.rem_trace.RemTraceItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.rem_trace.RemTraceForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_rem_trace_item',
	
	title : T('menu.RemTrace'),
	
	items : [ {
		xtype : 'base_rem_trace_form'
	} ]
});