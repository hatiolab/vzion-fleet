Ext.define('Fleet.view.location.LocationItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.location.LocationForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_location_item',
	
	title : T('menu.Location'),
	
	items : [ {
		xtype : 'fleet_location_form'
	} ]
});