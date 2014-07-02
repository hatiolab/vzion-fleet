Ext.define('Base.view.infographic.InfographicItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.infographic.InfographicForm',
		'Base.view.infographic.InfographicModeler'
	],
	
	xtype : 'base_infographic_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.Infographic'),
	
	items : [ {
		xtype : 'base_infographic_form'
	}, {
		xtype : 'base_infographic_modeler'
	}, {
		xtype : 'base_property_form'
	} ]
});