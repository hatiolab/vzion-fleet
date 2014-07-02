Ext.define('Fleet.controller.FleetController', {
	
	extend: 'Ext.app.Controller',

	requires: [ 'Fleet.mixin.MapLabel' ],

	stores: [],
	
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Fleet.controller.' + ctl);
		});

		this.control({
		});
		
		/* Loading Mixins */
		HF.mixin('Fleet.mixin.MapLabel');
	}
});
