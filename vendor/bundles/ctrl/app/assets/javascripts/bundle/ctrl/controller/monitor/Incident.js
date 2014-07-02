Ext.define('Ctrl.controller.monitor.Incident', {
	
	extend : 'Frx.controller.OpsController',
	
	requires : [ 
		'Fleet.store.Vehicle', 
		'Fleet.store.Driver', 
		'Fleet.store.Incident', 
		'Fleet.store.IncidentLog' 
	],
	
	mixins : [ 'Frx.mixin.lifecycle.FormLifeCycle' ],
	
	stores : [ 'Fleet.store.Incident', 'Fleet.store.IncidentLog' ],
	
	views : [ 'Ctrl.view.monitor.Incident' ],
	
	refs : [ { ref : 'IncidentView', selector : 'ctrl_incident' } ],
	
	init : function() {
		this.callParent(arguments);
		this.control({
			'ctrl_incident' : this.EntryPoint({
				activate : this.onMonitorResized,
				resize : this.onMonitorResized
			}),
			'ctrl_incident #incident_list' : {
				itemclick : this.onIncidentClick
			},
			'ctrl_incident #search' : {
				click : this.onIncidentSearch
			},
			'ctrl_incident #reset' : {
				click : this.onIncidentReset
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.initMap();
		this.setIncident(params);
		view.down(' #incident_list').store.load();
	},
	
	/**
	 * 화면이 Deactivate 될 때 액션 - 타이머를 종료시킴 
	 */
	onMonitorDeactived : function(panel, eOpts) {
	},
	
	/**
	 * 화면이 Resize 될 경우 - 맵 사이즈 조정
	 */
	onMonitorResized : function(view, width, height, oldWidth, oldHeight, eOpts) {
		view.resizeMap();
	},
	
	/**
	 * 차량 현재 상태 추적을 위한 Store
	 */
	getIncidentStore : function() {
		if(!this.incidentStore) {
			this.incidentStore = Ext.create('Fleet.store.Incident');
		}
		
		return this.incidentStore;
	},
	
	/**
	 * 그리드에서 Incident 선택시 
	 */
	onIncidentClick : function(grid, record, item, index, e, eOpts) {
		this.setIncident(record.data);
	},
	
	/**
	 * 현재 선택한 차량 정보를 Info 뷰와 Map에 표시 
	 */
	setIncident : function(incident) {
		if(incident && incident.incident_id) {
			this.getIncidentStore().proxy.extraParams = { "_q[incident_id-eq]" : incident.incident_id };
			this.getIncidentStore().load();
			
			// vehicle이 달라졌다면 차량 정보 폼에 정보를 뿌린다.
			if(!this.incident || (this.incident.incident_id != incident.incident_id)) {
				this.showIncidentInfo(incident);
			} 
			
			this.incident = incident;
		}
	},
	
	/**
	 * IncidentView에 차량 정보를 표시한다.
	 */
	showIncidentInfo : function(incident) {
		var incidentView = this.getIncidentView();
		/*var infoForm = incidentView.down(' #vehicle_form');
		infoForm.getForm().setValues(vehicle);
		var vehicleDesc = vehicle.vehicle.name + (vehicle.vehicle.description ? ' (' + vehicle.vehicle.description + ')' : '');
		var driverDesc = vehicle.driver.name + (vehicle.driver.description ? ' (' + vehicle.driver.description + ')' : '');
		var terminalDesc = vehicle.terminal.name + (vehicle.terminal.description ? ' (' + vehicle.terminal.description + ')' : '');
		infoForm.down(' displayfield[name=vehicle]').setValue(vehicleDesc);
		infoForm.down(' displayfield[name=driver]').setValue(driverDesc);
		infoForm.down(' displayfield[name=terminal]').setValue(terminalDesc);
		this.showAddrByLoc(vehicle.lat, vehicle.lng, infoForm.down(' displayfield[name=location]'));*/
	},
	
	/**
	 * lat, lng 정보로 부터 주소 정보를 표시한다.
	 */
	showAddrByLoc : function(lat, lng, infoField) {
		if (lat !== undefined && lng !== undefined) {
			var latlng = new google.maps.LatLng(lat, lng);

			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : latlng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var address = results[0].formatted_address
						infoField.setValue(address);
					}
				} else {
					HF.msg.alert("Geocoder failed due to: " + status);
				}
			});
		}
	},
	
	onIncidentReset : function() {
		var incidentView = this.getIncidentView();
		incidentView.down(' #vehicle_filter').setValue({id : '', name : '', description : ''});
		incidentView.down(' #driver_filter').setValue({id : '', name : '', description : ''});
	},
	
	onIncidentSearch : function() {
		var extraParams = {}
		
		var incidentView = this.getIncidentView();
		var vehicle = incidentView.down(' #vehicle_filter').getValue();
		var driver = incidentView.down(' #driver_filter').getValue();
		
		if(vehicle && vehicle.id) {
			extraParams["_q[vehicle_id-eq]"] = vehicle.id;
		}
		if(driver && driver.id) {
			extraParams["_q[driver_id-eq]"] = driver.id;
		}
		
		this.getIncidentStore().proxy.extraParams = extraParams;
		this.getIncidentStore().load();
	}
});