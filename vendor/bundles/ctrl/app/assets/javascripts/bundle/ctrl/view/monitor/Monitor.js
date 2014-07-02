/**
 * Monitor View
 */
Ext.define('Ctrl.view.monitor.Monitor', {
	
	extend : 'Ext.form.Panel',
		
	xtype : 'ctrl_monitor',
	
	title : T('menu.Monitor'),
	
	autoScroll : true,
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'panel',
		flex : 1,
		itemId : 'mapbox',
		html : '<div class="map" style="height:100%"></div>'
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->' ]
	} ],
	
	initMap : function() {
		this.map = new google.maps.Map(this.down(' #mapbox').getEl().down('.map').dom, {
			zoom : 10,
			maxZoom : 19,
			minZoom : 3,
			center : new google.maps.LatLng(37.381, 127.11846),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
	},
	
	getMap : function() {
		if(!this.map) {
			this.initMap();
		}
		return this.map;
	},
	
	getMarkers : function() {
		if(!this.markers)
			this.markers = {};
			
		return this.markers;
	},
	
	getLabels : function() {
		if(!this.labels)
			this.labels = {};
			
		return this.labels;
	},
	
	resetLabels : function() {
		for (var vehicle in this.labels) {
			this.labels[vehicle].setMap(null);
		}
		
		this.labels = {};
	},
	
	resetMarkers : function() {
		for (var vehicle in this.markers) {
			google.maps.event.clearListeners(this.markers[vehicle]);
			this.markers[vehicle].setMap(null);
		}
		
		this.markers = {};
	},
	
	resizeMap : function() {
		google.maps.event.trigger(this.getMap(), 'resize');
	},
	
	statusImages : {
		'Running' : '/assets/image/statusDriving.png',
		'Idle' : '/assets/image/statusStop.png',
		'Incident' : '/assets/image/statusIncident.png',
		'Maint' : '/assets/image/statusMaint.png'
	},
	
	/*
	 * refresh map
	 */
	refreshMap : function(records, autofit) {
		this.resetMarkers();
		this.resetLabels();
		var bounds = null;

		Ext.Array.each(records, function(record) {
			var vehicle = record.get('vehicle');
			var driver = record.get('driver');
			var latlng = new google.maps.LatLng(record.get('lat'), record.get('lng'));
			
			var marker = new google.maps.Marker({
				position : latlng,
				map : this.getMap(),
				status : record.get('status'),
				icon : this.statusImages[record.get('status')],
				title : driver ? driver.name : '',
				tooltip : vehicle.name + (driver ? " (" + driver.description + ")" : "")
			});

			if(!bounds)
				bounds = new google.maps.LatLngBounds(latlng, latlng);
			else
				bounds.extend(latlng);
			
			var label = HF.label.create({
				map : this.getMap()
			});
			label.bindTo('position', marker, 'position');
			label.bindTo('text', marker, 'tooltip');

			this.getMarkers()[vehicle.name] = marker;
			this.getLabels()[vehicle.name] = label;

			google.maps.event.addListener(marker, 'click', function() {
				HF.show('Ctrl.view.monitor.Information', record.data, {} );
			});
		}, this);
		
		if(!bounds) {
			this.getMap().setCenter(new google.maps.LatLng(37.381, 127.11846));
		} else if(bounds.isEmpty() || bounds.getNorthEast().equals(bounds.getSouthWest())) {
			this.getMap().setCenter(bounds.getNorthEast());
		} else if(autofit){ // 자동 스케일 조정 경우 
			this.getMap().fitBounds(bounds);
		} else { // 자동 스케일 조정이 아니어도, 센터에 맞추기를 한다면, 이렇게.
			this.getMap().setCenter(bounds.getCenter());
		}
	}
});
