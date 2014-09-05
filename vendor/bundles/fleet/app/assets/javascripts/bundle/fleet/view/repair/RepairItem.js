Ext.define('Fleet.view.repair.RepairItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.repair.RepairForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_repair_item',
	
	title : T('menu.Repair'),
	
	items : [ {
		xtype : 'fleet_repair_form'
	} ]
});