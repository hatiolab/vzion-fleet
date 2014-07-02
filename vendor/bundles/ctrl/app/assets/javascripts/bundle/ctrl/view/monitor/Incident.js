/**
 * Incident View
 */
Ext.define('Ctrl.view.monitor.Incident', {
	
	extend : 'Ext.form.Panel',
		
	xtype : 'ctrl_incident',
	
	title : T('menu.Incident'),
	
	autoScroll : true,
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'container',
		autoScroll : true,
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		//height : 460,
		flex : 1.5,
		items : [ {
			xtype : 'form',
			itemId : 'incident_form',
			cls : 'incidentSummary',
			height : 50,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			autoScroll : true,
			defaults : {
				anchor : '100%',
				labelAlign : 'top',
				cls : 'summaryCell'
			},
			items : [ {
				xtype : 'textfield',
				name : 'key',
				hidden : true
			}, {
				xtype : 'image',
				itemId : 'driverImage',
				cls : 'imgDriverSmall',
				height : 37
			}, {
				xtype : 'datefield',
				name : 'datetime',
				hidden : true,
				format : 'd-m-Y H:i:s'
			}, {
				xtype : 'displayfield',
				itemId : 'incident_time',
				width : 160,
				fieldLabel : T('label.x_time', {
					x : T('label.incident')
				})
			}, {
				xtype : 'displayfield',
				name : 'location',
				width : 300,
				fieldLabel : T('label.location')
			}, {
				xtype : 'displayfield',
				name : 'vehicle_id',
				width : 100,
				fieldLabel : T('label.vehicle')
			}, {
				xtype : 'displayfield',
				name : 'driver_id',
				width : 100,
				fieldLabel : T('label.driver')
			}, {
				xtype : 'displayfield',
				name : 'impulse_abs',
				width : 100,
				fieldLabel : T('label.impulse_abs')
			}, {
				xtype : 'displayfield',
				name : 'engine_temp',
				width : 100,
				fieldLabel : T('label.engine_temp')
			}, {
				xtype : 'checkbox',
				name : 'confirm',
				itemId : 'confirm',
				fieldLabel : T('label.confirm'),
				uncheckedValue : 'off',
				labelCls : 'labelStyle1',
				cls : 'backgroundNone'
			}, {
				xtype : 'displayfield',
				name : 'video_clip',
				hidden : true
			} ]
		}, {
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			flex : 1,
			items : [ {
				xtype : 'panel',
				// title : T('title.incident_details'),
				cls : 'paddingAll10 incidentVOD',
				width : 690,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [ {
					xtype : 'box',
					itemId : 'fullscreen',
					html : '<div class="btnFullscreen"></div>'
				}, {
					xtype : 'box',
					cls : 'incidentDetail',
					flex : 1,
					itemId : 'video',
					tpl : [ '<video width="100%" height="100%" controls="controls">', 
						    '<source {value} type="video/mp4" />',
							'Your browser does not support the video tag.', '</video>' ]
				} ]
			}, {
				xtype : 'panel',
				// title : T('title.position_of_incident'),
				cls : 'backgroundGray borderLeftGray',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [ {
					xtype : 'box',
					itemId : 'mapbox',
					html : '<div class="map"></div>',
					flex : 3
				}, {
					xtype : 'chart',
					itemId : 'chart',
					flex : 1,
					legend : {
						position : 'bottom',
						itemSpacing : 5,
						padding : 0,
						labelFont : "10px Helvetica, sans-serif",
						boxStroke : "transparent",
						boxFill : "transparent"
					},
					store : 'Fleet.store.IncidentLog',
					axes : [ {
						// title : T('label.acceleration'),
						type : 'Numeric',
						position : 'left',
						fields : [ 'accel_x', 'accel_y', 'accel_z' ]
					}, {
						// title : T('label.acceleration'),
						type : 'Numeric',
						position : 'right',
						fields : [ 'velocity' ]
					}, {
						// title : T('label.time'),
						type : 'Time',
						position : 'bottom',
						fields : [ 'created_at' ],
						dateFormat : 'H:i:s',
						step : [ Ext.Date.SECOND, 1 ],
						label : {
							rotate : {
								degrees : 45
							}
						}
					} ],
					series : [ {
						type : 'line',
						xField : 'created_at',
						yField : 'accel_x',
						axis : 'left',
						smooth : true
					}, {
						type : 'line',
						xField : 'created_at',
						yField : 'accel_y',
						axis : 'left',
						smooth : true
					}, {
						type : 'line',
						xField : 'created_at',
						yField : 'accel_z',
						axis : 'left',
						smooth : true
					}, {
						type : 'line',
						xField : 'created_at',
						yField : 'velocity',
						axis : 'right',
						smooth : true
					} ],
					flex : 2
				} ]
			} ]
		} ]
	}, {
		xtype : 'container',
		autoScroll : true,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		flex : 1,
		items : [ {
			xtype : 'gridpanel',
			itemId : 'incident_list',
			cls : 'hIndexbar',
			title : T('label.x_list', {x : T('label.incident')}),
			store : 'Fleet.store.Incident',
			autoScroll : true,
			flex : 1,
			columns : [ {
				dataIndex : 'key',
				text : 'Key',
				type : 'string',
				hidden : true
			}, {
				dataIndex : 'video_clip',
				text : 'V',
				xtype : 'checkcolumn',
				width : 40
			}, {
				dataIndex : 'confirm',
				text : T('label.confirm'),
				xtype : 'checkcolumn',
				align : 'center',
				width : 80
			}, {
				dataIndex : 'created_at',
				text : T('label.created_at'),
				xtype : 'datecolumn',
				width : 160,
				format : T('format.datetime')
			}, {
				dataIndex : 'driver',
				text : T('label.driver'),
				xtype : 'entitycolumn',
				width : 100,
			}, {
				dataIndex : 'vehicle',
				text : T('label.vehicle'),
				xtype : 'entitycolumn',
				width : 100
			}, {
				dataIndex : 'terminal',
				text : T('label.terminal'),
				xtype : 'entitycolumn',
				width : 100
			}, {
				dataIndex : 'lat',
				text : T('label.lat'),
				type : 'number',
				align : 'right',
				width : 100
			}, {
				dataIndex : 'lng',
				text : T('label.lng'),
				type : 'number',
				align : 'right',
				width : 110
			}, {
				dataIndex : 'velocity',
				text : T('label.velocity'),
				type : 'number',
				align : 'right',
				width : 100
			}, {
				dataIndex : 'impulse_abs',
				text : T('label.impulse_abs'),
				type : 'number',
				align : 'right',
				width : 130
			}, {
				dataIndex : 'impulse_x',
				text : T('label.impulse_x', {
					x : 'X'
				}),
				type : 'number',
				align : 'right',
				width : 110
			}, {
				dataIndex : 'impulse_y',
				text : T('label.impulse_x', {
					x : 'Y'
				}),
				type : 'number',
				align : 'right',
				width : 110
			}, {
				dataIndex : 'impulse_z',
				text : T('label.impulse_x', {
					x : 'Z'
				}),
				type : 'number',
				align : 'right',
				width : 110
			}, {
				dataIndex : 'impulse_threshold',
				text : T('label.impulse_threshold'),
				type : 'number',
				align : 'right',
				width : 170
			}, {
				dataIndex : 'obd_connected',
				text : T('label.obd'),
				renderer : function(value, cell) {
					return '<input type="checkbox" disabled="true" ' + (!!value ? 'checked ' : '') + '"/>';
				},
				align : 'center',
				width : 55
			}, {
				dataIndex : 'engine_temp',
				text : T('label.engine_temp'),
				type : 'number',
				align : 'right',
				width : 135
			}, {
				dataIndex : 'engine_temp_threshold',
				text : T('label.engine_temp_threshold'),
				type : 'number',
				align : 'right',
				width : 215
			} ],
			viewConfig : {},
			tbar : [ {
				xtype : 'entitycombo',
				storeClass : 'Fleet.store.Vehicle',
				fieldLabel : T('label.vehicle'),
				itemId : 'vehicle_filter',
				width : 400
			}, {
				xtype : 'entitycombo',
				storeClass : 'Fleet.store.Driver',
				fieldLabel : T('label.driver'),
				itemId : 'driver_filter',
				width : 400
			}, {
				itemId : 'search',
				text : T('button.search')
			}, {
				itemId : 'reset',
				text : T('button.reset')
			} ],
			bbar : {
				xtype : 'pagingtoolbar',
				itemId : 'pagingtoolbar',
				cls : 'pagingtoolbar', // 하단 page tool bar에 대한 아이콘 버튼 class
				store : 'Fleet.store.Incident',
				displayInfo : true,
				displayMsg : 'Displaying incidents {0} - {1} of {2}',
				emptyMsg : "No incidents to display"
			}
		} ]
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
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->' ]
	} ]
});
