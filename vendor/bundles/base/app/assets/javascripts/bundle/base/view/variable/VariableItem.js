Ext.define('Base.view.variable.VariableItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.variable.VariableForm',
		'Base.view.variable.VariableLogic'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_variable_item',
	
	title: T('menu.Variable'),
	
	items : [ {
		xtype : 'base_variable_form'
	}, {
		xtype : 'base_variable_logic'
	} ]
});