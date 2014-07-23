Ext.define('Fleet.view.vehicle.VehicleTrack', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_track',
	
	title : T('label.track'),
		
	autoScroll : true,
	
	items : [ {
		xtype : 'panel',
		title : T('menu.VehicleTrace'),
		cls : 'paddingPanel backgroundGray borderLeftGray',
		itemId : 'mapdiv',
		height : 400,
		html : '<div class="map" style="height:100%"></div>'
	}],
	
	initMap : function(lat, lng) {
		this.map = new google.maps.Map(this.down('#mapdiv').getEl().down('.map').dom, {
			zoom : 10,
			maxZoom : 19,
			minZoom : 3,
			center : new google.maps.LatLng(lat, lng),
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
	
	getMarkers : function() {
		if(!this.markers)
			this.markers = {};
			
		return this.markers;
	},
	
	setMarker : function(marker) {
		if (this.marker)
			this.marker.setMap(null);
	
		this.marker = marker;
	},
	
	/*
	 * refresh map
	 */
	refreshMap : function(center) {
		if (!center)
			return;

		// 지도 중심 이동
		this.map.setCenter(center);

		// 마커 표시 
		this.setMarker(null);
		this.setMarker(this.createMarker(center));
	},
	
	refreshLocation : function(center, radius) {		
		this.refreshMap(center);	
	},	

	refreshLocByAddr : function(address) {
		if(!address){
			Ext.Msg.alert(T('msg.address_notfound_title'), T('msg.address_empty'));
			return;
		}
		var self = this;
		// 주소로 위치 검색
	    this.geocoder.geocode({'address': address}, function(results, status) {
    	
	    	if (status == google.maps.GeocoderStatus.OK) {	    		
	    		var center = results[0].geometry.location;
	    		self.refreshLocation(center);
	      } else {
	    	  	self.setMarker(null);
	    	  	//Ext.Msg.alert("Failed to search!", "Address (" + address + ") Not Found!");
	    	  	Ext.Msg.alert(T('msg.address_notfound_title'), T('msg.address_notfound', {x:address}));
	      }
	    });
	},

	moveMarker : function(marker) {		
		var self = this;
		this.geocoder = new google.maps.Geocoder();
		var position = marker.getPosition();
	
		// 위치로 주소 검색
		this.geocoder.geocode({'latLng': position}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				self.refreshLocation(position);
				// 폼의 주소 필드에 주소값 업데이트
				self.down(' #form_address').setValue(results[0].formatted_address);				
			} else {
				self.map.setCenter(position);
				Ext.Msg.alert("Failed to search!", "Couldn't find address by position [" + position.lat() + ", " + position.lng() + "]!");
			}
		});
	},

	createMarker : function(center) {
		var self = this;
		var marker = new google.maps.Marker({
			position : center,
			map : self.map,
			draggable : true
		});
	
		if(this.marker && this.marker.dragend_listener) {
			google.maps.event.removeListener(this.marker.dragend_listener);
		}
	
		marker.dragend_listener = google.maps.event.addListener(marker, 'dragend', function() {
			self.moveMarker(marker);
		});
			
		return marker;
	},
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.date'), name : 'trace_time', xtype : 'daterange', format : T('format.date') },
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});