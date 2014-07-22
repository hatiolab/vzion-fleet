Ext.define('Fleet.view.location.LocationForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_location_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'address', fieldLabel : T('label.address') },
		{ name : 'radius', fieldLabel : T('label.radius'), xtype : 'numberfield' },
		{ name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield' },
		{ name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield' },
		{ name : 'lat_hi', fieldLabel : T('label.lat_hi'), xtype : 'numberfield' },
		{ name : 'lat_low', fieldLabel : T('label.lat_low'), xtype : 'numberfield' },
		{ name : 'lng_hi', fieldLabel : T('label.lng_hi'), xtype : 'numberfield' },
		{ name : 'lng_low', fieldLabel : T('label.lng_low'), xtype : 'numberfield' },
		{ xtype : 'timestamp' },
		{
			xtype : 'panel',
			title : T('menu.VehicleTrace'),
			cls : 'paddingPanel backgroundGray borderLeftGray',
			itemId : 'mapdiv',
			flex : 1,
			html : '<div class="map"></div>'
		}
	],
	
	initMap : function() {
		this.map = new google.maps.Map(this.down(' #mapdiv').getEl().down('.map').dom, {
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
	refreshMap : function(record, autofit) {
		this.resetMarkers();
		this.resetLabels();
		var bounds = null;

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
		
		if(!bounds) {
			this.getMap().setCenter(new google.maps.LatLng(37.381, 127.11846));
		} else if(bounds.isEmpty() || bounds.getNorthEast().equals(bounds.getSouthWest())) {
			this.getMap().setCenter(bounds.getNorthEast());
		} else if(autofit){ // 자동 스케일 조정 경우 
			this.getMap().fitBounds(bounds);
		} else { // 자동 스케일 조정이 아니어도, 센터에 맞추기를 한다면, 이렇게.
			this.getMap().setCenter(bounds.getCenter());
		}
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});