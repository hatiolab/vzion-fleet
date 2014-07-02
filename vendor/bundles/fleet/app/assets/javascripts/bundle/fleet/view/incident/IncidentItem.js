Ext.define('Fleet.view.incident.IncidentItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.incident.IncidentForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_incident_item',
	
	title : T('menu.Incident'),
	
	items : [ {
		xtype : 'fleet_incident_form'
	} ]
});