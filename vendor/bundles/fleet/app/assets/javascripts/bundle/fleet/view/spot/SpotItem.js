Ext.define('Fleet.view.spot.SpotItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.spot.SpotForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_spot_item',
	
	title : T('menu.Spot'),
	
	items : [ {
		xtype : 'fleet_spot_form'
	} ]
});