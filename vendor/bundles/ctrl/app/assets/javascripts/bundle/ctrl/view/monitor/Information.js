/**
 * Information View
 */
Ext.define('Ctrl.view.monitor.Information', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'ctrl_information',
	
	title : T('menu.Information'),
	
	autoScroll : true,
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'container',
		flex : 2,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [ {
			xtype : 'container',
			flex : 1.7,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [ {
				xtype : 'panel',
				title : T('label.vehicle'),
				cls : 'paddingPanel',
				layout : {
					type : 'hbox'
				},
				items : [ {
					xtype : 'image',
					itemId : 'vehicleImage',
					cls : 'imgVehicle'
				}, {
					xtype : 'image',
					itemId : 'driverImage',
					cls : 'imgDriver'
				}, {
					xtype : 'form',
					itemId : 'vehicle_form',
					flex : 1,
					defaults : {
						labelWidth : 60,
						labelSeparator : '',
						anchor : '100%'
					},
					items : [ {
						xtype : 'displayfield',
						name : 'vehicle',
						fieldLabel : T('label.vehicle'),
						cls : 'dotUnderline',
						itemId : 'id'
					}, {
						xtype : 'displayfield',
						name : 'driver',
						fieldLabel : T('label.driver'),
						cls : 'dotUnderline',
						itemId : 'driver'
					}, {
						xtype : 'displayfield',
						name : 'terminal',
						fieldLabel : T('label.terminal'),
						cls : 'dotUnderline',
						itemId : 'terminal'
					}, {
						xtype : 'displayfield',
						name : 'location',
						fieldLabel : T('label.location'),
						cls : 'dotUnderline',
						itemId : 'location'
					}, {
						xtype : 'displayfield',
						name : 'total_dist',
						cls : 'dotUnderline',
						itemId : 'total_dist',
						fieldLabel : T('label.run_dist') + ' (km)'
					}, {
						xtype : 'displayfield',
						name : 'total_runtime',
						fieldLabel : T('label.run_time') + ' (min.)',
						itemId : 'total_runtime',
						cls : 'dotUnderline'
					} ]
				} ]
			}, {
				xtype : 'panel',
				title : T('menu.Incident'),
				layout : 'fit',
				cls : 'paddingPanel',
				flex : 1,
				items : [ {
					xtype : 'container',
					itemId : 'incidents',
					layout : {
						type : 'hbox',
						align : 'left'
					}
				} ]
			} ]
		}, {
			xtype : 'panel',
			title : T('menu.VehicleTrace'),
			cls : 'paddingPanel backgroundGray borderLeftGray',
			itemId : 'mapdiv',
			flex : 1,
			html : '<div class="map"></div>'
		} ]
	}, {
		xtype : 'grid',
		itemId : 'vehicle_list',
		flex : 1,
		title : T('menu.Vehicle'),
		autoScroll : true,
		store : Ext.create('Fleet.store.VehicleStatus'),
		columns : [
			{ header : T('label.id'), dataIndex : 'id', hidden : true },
			{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn' },
			{ 
				header : T('label.x_desc', {x : T('label.vehicle')}), 
				dataIndex : 'vehicle', 
				width : 150, 
				renderer : function(val) {
					return val ? val.description : '';
				} 
			},
			{ header : T('label.driver'), dataIndex : 'driver', xtype : 'entitycolumn' },
			{ 
				header : T('label.x_desc', {x : T('label.driver')}), 
				dataIndex : 'driver', 
				width : 150, 
				renderer : function(val) {
					return val ? val.description : '';
				} 
			},
			{ header : T('label.terminal'), dataIndex : 'terminal', xtype : 'entitycolumn' },
			{ 
				header : T('label.x_desc', {x : T('label.terminal')}), 
				dataIndex : 'terminal', 
				width : 150, 
				renderer : function(val) {
					return val ? val.description : '';
				} 
			},
			{ header : T('label.status'), dataIndex : 'status', width : 90 },
			{ header : T('label.total_dist'), dataIndex : 'total_dist', xtype : 'numbercolumn', width : 105, align : 'right', format : T('format.number') },
			{ header : T('label.total_runtime'), dataIndex : 'total_runtime', xtype : 'numbercolumn', width : 140, align : 'right', format : T('format.number') },
			{ header : T('label.remain_fuel'), dataIndex : 'remain_fuel', width : 130, align : 'right' },
			{ header : T('label.official_effcc'), dataIndex : 'official_effcc', width : 120, align : 'right' },
			{ header : T('label.avg_effcc'), dataIndex : 'avg_effcc', width : 110, align : 'right' },
			{ header : T('label.eco_index'), dataIndex : 'eco_index', width : 105, align : 'right' },
			{ header : T('label.eco_run_rate'), dataIndex : 'eco_run_rate', width : 135, align : 'right' },
			{ header : T('label.lat'), dataIndex : 'lat', width : 100, align : 'right' },
			{ header : T('label.lng'), dataIndex : 'lng', width : 105, align : 'right' }
		]
	} ],
	
	initMap : function() {
		this.map = new google.maps.Map(this.down(' #mapdiv').getEl().down('.map').dom, {
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
	
	resetMarkers : function() {
		for (var vehicle in this.markers) {
			google.maps.event.clearListeners(this.markers[vehicle]);
			this.markers[vehicle].setMap(null);
		}
		
		this.markers = {};
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

		var vehicle = record.data.vehicle;
		var driver = record.data.driver;
		latlng = new google.maps.LatLng(record.data.lat, record.data.lng);
		
		var marker = new google.maps.Marker({
			position : latlng,
			map : this.getMap(),
			status : record.data.status,
			icon : this.statusImages[record.data.status],
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
	
	refreshIncidents : function(store) {
		var incidents = this.down(' #incidents');
		incidents.removeAll();
		
		var max = store.count() > 4 ? 4 : store.count();
		for (var i = 0; i < max; i++) {
			var incident = store.getAt(i);
			var self = this;
			incidents.add({
				xtype : 'box',
				cls : 'incidentThumb',
				listeners : {
					'render' : function() {
						this.getEl().on('click', self.incidentHandler, self, incident);
					}
				},
				data : {
					vehicle_id : incident.get('vehicle_id'),
					driver_id : incident.get('driver_id'),
					datetime : Ext.Date.format(incident.get('datetime'), 'Y-m-d H:i:s')
				},
				tpl : [ '<div class="vehicle">{vehicle_id}</div>', 
						'<div class="driver">{driver_id}</div>',
						'<div class="date">{datetime}</div>' 
				]
			})
		}
	},
	
	incidentHandler : function(e, el, incident) {
		HF.show('Ctrl.view.monitor.Incident', incident.data, {});
	},
	
	dockedItems : [ {
		xtype : 'controlbar',
		items : ['->' ]
	} ]
});
