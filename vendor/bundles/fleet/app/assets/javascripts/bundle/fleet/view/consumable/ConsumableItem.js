Ext.define('Fleet.view.consumable.ConsumableItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.consumable.ConsumableForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_consumable_item',
	
	title : T('menu.Consumable'),
	
	items : [ {
		xtype : 'fleet_consumable_form'
	} ]
});