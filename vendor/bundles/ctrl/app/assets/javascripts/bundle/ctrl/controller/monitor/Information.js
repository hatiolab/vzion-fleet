Ext.define('Ctrl.controller.monitor.Information', {
	
	extend : 'Frx.controller.OpsController',
	
	requires : [ 'Fleet.store.VehicleTracking', 'Fleet.store.Vehicle', 'Fleet.store.Incident' ],
	
	mixins : [ 'Frx.mixin.lifecycle.FormLifeCycle' ],
	
	views : [ 'Ctrl.view.monitor.Information' ],
	
	refs : [ { ref : 'InformationView', selector : 'ctrl_information' } ],
	
	init : function() {
		this.callParent(arguments);
		this.control({
			'ctrl_information' : this.EntryPoint({
				activate : this.onMonitorResized,
				resize : this.onMonitorResized
			}),
			'ctrl_information #vehicle_list' : {
				itemclick : this.onVehicleClick
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.initMap();
		this.setVehicle(params);
		view.down(' #vehicle_list').store.load();
		
		this.onAutoFitChange(HF.setting.get('option-auto_fit'));
		this.onRefreshTermChange(HF.setting.get('option-refresh_interval'));
		
		HF.setting.on('option-auto_fit', this.onAutoFitChange, this);
		HF.setting.on('option-refresh_interval', this.onRefreshTermChange, this);
		
		this.trackStore = this.getVehicleTraceStore();
		this.trackStore.on('load', function(store, records, success, eOpts) {
			if(records.length > 0) {
				view.refreshMap(records[0], HF.setting.get('option-auto_fit'));
			}
		}, this);
		
		this.incidentStore = this.getIncidentStore();
		this.incidentStore.on('load', function(store, records, success, eOpts) {
			if(records.length > 0) {
				view.refreshIncidents(store);
			}
		}, this);
	},
	
	/**
	 * 화면이 Deactivate 될 때 액션 - 타이머를 종료시킴 
	 */
	onMonitorDeactived : function(panel, eOpts) {
		if(this.refreshTask) {
			this.refreshTask.cancel();
			this.refreshTask = null;
			this.trackStore = null;
			this.vehicle = null;
		}
	},
	
	/**
	 * 화면이 Resize 될 경우 - 맵 사이즈 조정
	 */
	onMonitorResized : function(view, width, height, oldWidth, oldHeight, eOpts) {
		view.resizeMap();
	},
	
	/**
	 * Auto Fit 설정이 변경되었을 경우 - 화면 리프레쉬 
	 */
	onAutoFitChange : function(autoFit) {
		this.setVehicle(this.vehicle);
	},
	
	/**
	 * Refresh 간격 설정이 변경되었을 경우 - 리프레쉬 간격 재설정
	 */
	onRefreshTermChange : function(value) {
		var interval = value * 1000;
		if(this.refreshTask) {
			this.refreshTask.cancel();
		}
		
		this.refreshTask = new Ext.util.DelayedTask(function() {
			this.setVehicle(this.vehicle);
			this.refreshTask.delay(interval);
		}, this);
		
		this.refreshTask.delay(interval);
	},
	
	/**
	 * 차량 현재 상태 추적을 위한 Store
	 */
	getVehicleTraceStore : function() {
		if(!this.trackStore) {
			this.trackStore = Ext.create('Fleet.store.VehicleTracking');
		}
		
		return this.trackStore;
	},
	
	/**
	 * 차량 현재 이상 상황 추적을 위한 Store
	 */
	getIncidentStore : function() {
		if(!this.incidentStore) {
			this.incidentStore = Ext.create('Fleet.store.Incident');
		}
		
		return this.incidentStore;
	},
	
	/**
	 * 차량을 그리드에서 선택했을 경우 
	 */
	onVehicleClick : function(grid, record, item, index, e, eOpts) {
		this.setVehicle(record.data);
	},
	
	/**
	 * 현재 선택한 차량 정보를 Info 뷰와 Map에 표시 
	 */
	setVehicle : function(vehicle) {
		if(vehicle && vehicle.vehicle.id) {
			this.getVehicleTraceStore().proxy.extraParams = { "_q[vehicle_id-eq]" : vehicle.vehicle.id };
			this.getVehicleTraceStore().load();
			this.getIncidentStore().load();
			
			// vehicle이 달라졌다면 차량 정보 폼에 정보를 뿌린다.
			if(!this.vehicle || (this.vehicle.vehicle.id != vehicle.vehicle.id && vehicle.vehicle.name)) {
				this.showVehicleInfo(vehicle);
			} 
			
			this.vehicle = vehicle;
		}
	},
	
	/**
	 * Vehicle Info에 차량 정보를 표시한다.
	 */
	showVehicleInfo : function(vehicle) {
		var infoView = this.getInformationView();
		var infoForm = infoView.down(' #vehicle_form');
		infoForm.getForm().setValues(vehicle);
		var vehicleDesc = vehicle.vehicle.name + (vehicle.vehicle.description ? ' (' + vehicle.vehicle.description + ')' : '');
		var driverDesc = vehicle.driver.name + (vehicle.driver.description ? ' (' + vehicle.driver.description + ')' : '');
		var terminalDesc = vehicle.terminal.name + (vehicle.terminal.description ? ' (' + vehicle.terminal.description + ')' : '');
		infoForm.down(' displayfield[name=vehicle]').setValue(vehicleDesc);
		infoForm.down(' displayfield[name=driver]').setValue(driverDesc);
		infoForm.down(' displayfield[name=terminal]').setValue(terminalDesc);
		this.showAddrByLoc(vehicle.lat, vehicle.lng, infoForm.down(' displayfield[name=location]'));
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
	}

});