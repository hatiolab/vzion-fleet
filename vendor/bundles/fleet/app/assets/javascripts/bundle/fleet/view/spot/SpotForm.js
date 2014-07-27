Ext.define('Fleet.view.spot.SpotForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_spot_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [ {
		xtype : 'container',
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [{
			xtype : 'container',
			flex : 1.9,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [{
				name : 'id', fieldLabel : T('label.id'), hidden : true
			}, {
				name : 'domain_id', value : login.current_domain_id, hidden : true
			}, {
				name : 'name', fieldLabel : T('label.name'), xtype : 'textfield', allowBlank : false, maxLength : 64
			}, {
				name : 'description', fieldLabel : T('label.description'), xtype : 'textfield', maxLength : 255
			}, {
				name : 'address', fieldLabel : T('label.address'), xtype : 'textfield', itemId : 'form_address'
			}, {
				name : 'radius', fieldLabel : T('label.radius'), xtype : 'numberfield', itemId : 'form_radius', minValue : 0, step : 100
			}, {
				name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield', itemId : 'form_latitude'
			}]
		}, {
			xtype : 'container',
			flex : 0.2,
			layout : {
				type : 'vbox',
				align : 'stretch'
			}
		}, {
			xtype : 'container',
			flex : 1.9,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [{
				name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield', itemId : 'form_longitude'
			}, {
				name : 'lat_hi', fieldLabel : T('label.lat_hi'), xtype : 'numberfield', itemId : 'form_lat_hi',
			}, {
				name : 'lat_low', fieldLabel : T('label.lat_low'), xtype : 'numberfield', itemId : 'form_lat_lo'
			}, {
				name : 'lng_hi', fieldLabel : T('label.lng_hi'), xtype : 'numberfield', itemId : 'form_lng_hi'
			}, {
				name : 'lng_low', fieldLabel : T('label.lng_low'), xtype : 'numberfield', itemId : 'form_lng_lo'
			}]
		}]
	}, {
		xtype : 'panel',
		title : T('menu.VehicleTrace'),
		cls : 'paddingPanel backgroundGray borderLeftGray',
		itemId : 'mapdiv',
		flex : 1,
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
	
	getCircle : function() {
		if(!this.circle)
			this.circle = {};
			
		return this.circle;
	},
	
	setCircle : function(circle) {	
		if (this.circle)
			this.circle.setMap(null);
				
		this.circle = circle;
	},
	
	/*
	 * refresh map
	 */
	refreshMap : function(center, radius) {
		if (!center)
			return;

		// 지도 중심 이동
		this.map.setCenter(center);

		// 마커 표시 
		this.setMarker(null);
		this.setMarker(this.createMarker(center));
		
		if(!radius)
			radius = this.down(' #form_radius').getValue();


		// Circle Refresh
		this.refreshCircle(radius);		
	},
	
	refreshSpot : function(center, radius) {		
		this.refreshMap(center, radius);
		// 폼 위도, 경도에 추가	
		this.down(' #form_latitude').setValue(center.lat());
		this.down(' #form_longitude').setValue(center.lng());		
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
	    		var center = results[0].geometry.spot;
	    		self.refreshSpot(center);
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
				self.refreshSpot(position);
				// 폼의 주소 필드에 주소값 업데이트
				self.down(' #form_address').setValue(results[0].formatted_address);				
			} else {
				self.map.setCenter(position);
				Ext.Msg.alert("Failed to search!", "Couldn't find address by position [" + position.lat() + ", " + position.lng() + "]!");
			}
		});
	},

	refreshCircle : function(radius) {
	
		if(!this.marker)
			return;
	
		if(!radius)
			radius = this.down(' #form_radius').getValue();
	
		this.setCircle(null);
		if(radius) {
			var map = this.map;
			var marker = this.marker;
			this.setCircle(this.createCircle(marker.getPosition(), radius));
		
			// North, West, South, East lat, lng를 구함
			var bounds = this.circle.getBounds();
			var northWest = bounds.getNorthEast();
			var southEast = bounds.getSouthWest();
		
			this.down(' #form_radius').setValue(radius);
			this.down(' #form_lat_hi').setValue(northWest.lat());
			this.down(' #form_lng_hi').setValue(northWest.lng());
			this.down(' #form_lat_lo').setValue(southEast.lat());
			this.down(' #form_lng_lo').setValue(southEast.lng());
		}
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

	createCircle : function(center, radius) {
	
		if(!center)
			return;
	
		if(!radius)
			radius = this.down(' #form_radius').getValue();
	
		var self = this;
		var circle = new google.maps.Circle({
			map: this.map,
			center : center,
			radius: radius,
			strokeColor : 'red',
			editable : true
  	  	});
	
		if(this.circle && this.circle.radius_change_listener) {
			google.maps.event.removeListener(this.circle.radius_change_listener);
		}
	
		circle.radius_change_listener = google.maps.event.addListener(circle, 'radius_changed', function() {
			self.radiusChanged(circle.getRadius());
		});
	
		return circle;
	},

	radiusChanged : function(radius) {		
		if(this.marker) {
			this.refreshCircle(radius);
		}
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});