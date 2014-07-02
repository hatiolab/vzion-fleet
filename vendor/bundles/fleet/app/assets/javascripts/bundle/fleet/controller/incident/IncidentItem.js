/**
 * IncidentDetail controller
 */
Ext.define('Fleet.controller.incident.IncidentItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Incident', 
		'Fleet.store.Incident', 
		'Fleet.view.incident.IncidentItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Incident'],
			
	stores: ['Fleet.store.Incident'],
	
	views : ['Fleet.view.incident.IncidentItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_incident_item' : this.EntryPoint(),
			'fleet_incident_form' : this.FormEventHandler()
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});