Ext.define('Ctrl.controller.monitor.Monitor', {
	
	extend : 'Frx.controller.OpsController',
	
	requires : [ 'Fleet.store.VehicleTracking' ],
	
	mixins : [ 'Frx.mixin.lifecycle.FormLifeCycle' ],
	
	views : [ 'Ctrl.view.monitor.Monitor' ],
	
	refs : [ { ref : 'MonitorView', selector : 'ctrl_monitor' } ],
	
	init : function() {
		this.callParent(arguments);
		this.control({
			'ctrl_monitor' : this.EntryPoint({
				deactivate : this.onMonitorDeactived,
				activate : this.onMonitorResized,
				resize : this.onMonitorResized
			})
		});
	},
	
	onParamsChange : function(view, params) {
		view.initMap();
		
		this.onAutoFitChange(HF.setting.get('option-auto_fit'));
		this.onRefreshTermChange(HF.setting.get('option-refresh_interval'));
		
		HF.setting.on('option-auto_fit', this.onAutoFitChange, this);
		HF.setting.on('option-refresh_interval', this.onRefreshTermChange, this);
		
		this.trackStore = this.getVehicleTraceStore();
		this.trackStore.on('load', function(store, records, success, eOpts) {
			view.refreshMap(records, HF.setting.get('option-auto_fit'));
		}, this);
	},
	
	onMonitorDeactived : function(panel, eOpts) {
		if(this.refreshTask) {
			this.refreshTask.cancel();
			this.refreshTask = null;
			this.trackStore = null;
		}
	},
	
	onMonitorResized : function(view, width, height, oldWidth, oldHeight, eOpts) {
		view.resizeMap();
	},
	
	onAutoFitChange : function(autoFit) {
		this.loadVehicleTraceStore();
	},
	
	onRefreshTermChange : function(value) {
		var interval = value * 1000;
		if(this.refreshTask) {
			this.refreshTask.cancel();
		}
		
		this.refreshTask = new Ext.util.DelayedTask(function() {
			this.loadVehicleTraceStore();
			this.refreshTask.delay(interval);
		}, this);
		
		this.refreshTask.delay(interval);
	},
	
	getVehicleTraceStore : function() {
		if(!this.trackStore) {
			this.trackStore = Ext.create('Fleet.store.VehicleTracking');
		}
		return this.trackStore;
	},
	
	loadVehicleTraceStore : function() {
		this.getVehicleTraceStore().load();
	}
});