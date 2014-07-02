Ext.define('Base.view.domain.DomainItem', {
	
	extend : 'Ext.tab.Panel',
	
	xtype : 'base_domain_item',
	
 	requires : [ 
		'Base.view.domain.DomainForm',
		'Base.view.domain.DomainShiftForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.Domain'),
	
	items : [ {
		xtype : 'base_domain_form'
	},{
		xtype : 'base_domain_shift_form'
	} ]
});