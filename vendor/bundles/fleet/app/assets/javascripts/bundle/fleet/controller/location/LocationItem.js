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
			'fleet_location_form' : this.FormEventHandler()
		});
	},
	
	/**
	 * override
	 */	
	onAfterLoadItem : function(view, record, operation) {
		view.loadRecord(record);
		var lat = record.get('lat') === 0 ? HF.defaultLat() : record.get('lat');
		var lng = record.get('lng') === 0 ? HF.defaultLng() : record.get('lng');
		view.initMap(lat, lng);
		view.refreshMap(new google.maps.LatLng(lat, lng), record.get('radius'));
	},
	
	/**
	 * override
	 */
	onAfterSaveItem : function(view, record) {
		if(view instanceof Ext.form.Panel) {
			view.loadRecord(record);
			if(record.get('radius') > 0) {
				view.refreshCircle(record.get('radius'));
			}
		}
	},

});