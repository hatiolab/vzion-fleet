/**
 * LocationDetail controller
 */
Ext.define('Fleet.controller.location.LocationItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Location', 
		'Fleet.store.Location', 
		'Fleet.view.location.LocationItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Location'],
			
	stores: ['Fleet.store.Location'],
	
	views : ['Fleet.view.location.LocationItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location_item' : this.EntryPoint(),
			'fleet_location_form' : this.FormEventHandler({
				after_load_item : this.onAfterLoadItemLocationForm
			})
		});
	},
	
	onAfterLoadItemLocationForm : function(view, record, operation) {
		view.loadRecord(record);
		view.initMap(record.get('lat'), record.get('lng'));
		
		view.refreshMap(new google.maps.LatLng(record.get('lat'), record.get('lng')), record.get('radius'));
		
	}

});