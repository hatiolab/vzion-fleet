Ext.define('Fleet.view.vehicle.VehicleTrack', {
	
	extend : 'Ext.panel.Panel',
	
	xtype : 'fleet_vehicle_track',
	
	title : T('menu.VehicleTrace'),
		
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'panel',
		title : T('menu.VehicleTrace'),
		cls : 'paddingPanel backgroundGray borderLeftGray',
		itemId : 'mapdiv',
		flex : 1,
		html : '<div class="map" style="height:100%"></div>'
	} ],
	
	initMap : function() {
		this.map = new google.maps.Map(this.down('#mapdiv').getEl().down('.map').dom, {
			zoom : 10,
			maxZoom : 19,
			minZoom : 3,
			center : new google.maps.LatLng(HF.defaultLat(), HF.defaultLng()),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
	},
		
	getMap : function() {
		if(!this.map) {
			this.initMap();
		}
		return this.map;
	},
	
	setMap : function(map) {
		this.map = map;
	},
	
	getTrackLine : function() {
		return this.trackline;
	},

	setTrackLine : function(trackline) {
		if (this.trackline)
			this.trackline.setMap(null);
			
		this.trackline = trackline;
	},
	
	getMarkers : function() {
		if(!this.markers)
			this.markers = {};
			
		return this.markers;
	},
	
	setMarkers : function(markers) {
		if (this.markers) {
			Ext.each(this.markers, function(marker) {
				marker.setMap(null);
			});
		}

		this.markers = markers;
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
	refreshMap : function() {
		this.setTrackLine(new google.maps.Polyline({
			map : this.getMap(),
			strokeColor : '#FF0000',
			strokeOpacity : 1.0,
			strokeWeight : 4
		}));
		
		this.setMarkers(null);
				
		var bounds = null;

		latlng = new google.maps.LatLng(HF.defaultLat(), HF.defaultLng());
		
		if(!bounds)
			bounds = new google.maps.LatLngBounds(latlng, latlng);
		else
			bounds.extend(latlng);
		

		if(!bounds) {
			this.getMap().setCenter(new google.maps.LatLng(HF.defaultLat(), HF.defaultLng()));
		} else if(bounds.isEmpty() || bounds.getNorthEast().equals(bounds.getSouthWest())) {
			this.getMap().setCenter(bounds.getNorthEast());
		} else if(autofit){ // 자동 스케일 조정 경우 
			this.getMap().fitBounds(bounds);
		} else { // 자동 스케일 조정이 아니어도, 센터에 맞추기를 한다면, 이렇게.
			this.getMap().setCenter(bounds.getCenter());
		}
	},
	
	refreshTrack : function(records) {
		this.setTrackLine(new google.maps.Polyline({
			map : this.getMap(),
			strokeColor : '#FF0000',
			strokeOpacity : 1.0,
			strokeWeight : 4
		}));
		
		this.setMarkers(null);

		var path = this.getTrackLine().getPath();
		var bounds = null, latlng = null;

		Ext.Array.each(records, function(record) {
			var lat = record.get('lat');
			var lng = record.get('lng');

			if(lat !== 0 || lng !== 0) {
				latlng = new google.maps.LatLng(lat, lng);
				path.push(latlng);
				if (!bounds)
					bounds = new google.maps.LatLngBounds(latlng, latlng);
				else
					bounds.extend(latlng);
			}
		});

		if (path.getLength() === 0) {
			var record = this.getForm().getRecord();
			var lat = record.get('lat');
			var lng = record.get('lng');
			var defaultLatlng = null;
			
			if(lat === 0 && lng === 0) {
				defaultLatlng = new google.maps.LatLng(HF.defaultLat(), HF.defaultLng());
			} else {
				defaultLatlng = new google.maps.LatLng(lat, lng);
			}
			path.push(defaultLatlng);
			bounds = new google.maps.LatLngBounds(defaultLatlng, defaultLatlng);
		}

		if (bounds.isEmpty() || bounds.getNorthEast().equals(bounds.getSouthWest())) {
			this.getMap().setCenter(bounds.getNorthEast());
		} else {
			this.getMap().fitBounds(bounds);
		}
		
		var first = path.getAt(0);
		if (first) {
			var start = new google.maps.Marker({
				position : new google.maps.LatLng(first.lat(), first.lng()),
				map : this.getMap()
			});

			var last = path.getAt(path.getLength() - 1);
			var end = new google.maps.Marker({
				position : new google.maps.LatLng(last.lat(), last.lng()),
				icon : '/assets/image/iconStartPoint.png',
				map : this.getMap()
			});
			this.setMarkers([ start, end ]);
		}
	},
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'trace_time-dt_eq', xtype : 'datefield', format : T('format.date'), submitFormat : T('format.submitDate') }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'list']
	} ]
});