/**
 * LocationDetail controller
 */
Ext.define('Fleet.controller.location.LocationItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Fleet.model.Location', 
		'Fleet.store.Location', 
		'Fleet.view.location.LocationItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Fleet.model.Location'],
			
	stores: ['Fleet.store.Location'],
	
	views : ['Fleet.view.location.LocationItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'fleet_location_item' : this.EntryPoint(),
			'fleet_location_form' : this.FormEventHandler({
				after_load_item : this.onAfterLoadItemLocationForm,
			})
		});
	},
	
	onAfterLoadItemLocationForm : function(view, params) {
		view.initMap();
		
		this.onAutoFitChange(HF.setting.get('option-auto_fit'));
		this.onRefreshTermChange(HF.setting.get('option-refresh_interval'));
		
		HF.setting.on('option-auto_fit', this.onAutoFitChange, this);
		HF.setting.on('option-refresh_interval', this.onRefreshTermChange, this);
		
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
		//this.setVehicle(this.vehicle);
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
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/

	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});