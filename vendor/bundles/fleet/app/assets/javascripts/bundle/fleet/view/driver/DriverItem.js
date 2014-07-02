Ext.define('Fleet.view.driver.DriverItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.driver.DriverForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_driver_item',
	
	title : T('menu.Driver'),
	
	items : [ {
		xtype : 'fleet_driver_form'
	}, {
		xtype : 'base_property_form'
	}, {
		xtype : 'base_attachment_form'
	} ]
});