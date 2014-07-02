Ext.define('Base.view.diy_selection.DiySelectionItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.diy_selection.DiySelectionForm',
		'Base.view.diy_selection.DiySelectionLogic',
		'Base.view.diy_selection.DiySelectionCountLogic',
		'Base.view.diy_selection.DiySelectionInParams',
		'Base.view.diy_selection.DiySelectionOutParams',
		'Base.view.diy_selection.DiySelectionTest'
	],
	
	xtype : 'base_diy_selection_item',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.DiySelection'),
	
	items : [ {
		xtype : 'base_diy_selection_form'
	}, {
		xtype : 'base_diy_selection_logic'
	}, {
		xtype : 'base_diy_selection_in_params_list'
	}, {
		xtype : 'base_diy_selection_out_params_list'
	}, {
		xtype : 'base_diy_selection_test'
	} ]
});