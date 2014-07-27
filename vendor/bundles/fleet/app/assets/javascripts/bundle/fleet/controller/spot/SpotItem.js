/**
 * SpotDetail controller
 */
Ext.define('Fleet.controller.spot.SpotItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Spot', 
		'Fleet.store.Spot', 
		'Fleet.view.spot.SpotItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Spot'],
			
	stores: ['Fleet.store.Spot'],
	
	views : ['Fleet.view.spot.SpotItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_spot_item' : this.EntryPoint(),
			'fleet_spot_form' : this.FormEventHandler()
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