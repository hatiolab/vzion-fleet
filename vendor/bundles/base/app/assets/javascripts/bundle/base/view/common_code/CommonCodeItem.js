Ext.define('Base.view.common_code.CommonCodeItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.common_code.CommonCodeForm',
		'Base.view.common_code.CommonCodeList'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_common_code_item',
	
	title: T('menu.CommonCode'),
	
	items : [ {
		xtype : 'base_common_code_form'
	}, {
		xtype : 'base_common_code_list'
	} ]
});
