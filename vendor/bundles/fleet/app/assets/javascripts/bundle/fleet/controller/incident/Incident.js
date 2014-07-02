/**
 * Incident controller
 */
Ext.define('Fleet.controller.incident.Incident', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Fleet.model.Incident', 
		'Fleet.store.Incident', 
		'Fleet.view.incident.Incident' 
	],
	
	models : ['Fleet.model.Incident'],
			
	stores: ['Fleet.store.Incident'],
	
	views : ['Fleet.view.incident.Incident'],
	
	refs: [ { ref : 'Incident', selector : 'fleet_incident' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_incident' : this.EntryPoint(),
			'fleet_incident #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});