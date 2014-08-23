Ext.define('FleetTouch.store.DriverSummaryStore', {
	
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,
		
		remoteFilter : true,

		pageSize : 1,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'division',
			type : 'string'
		}, {
			name : 'title',
			type : 'string'
		}, {
			name : 'social_id',
			type : 'string'
		}, {
			name : 'phone_no',
			type : 'string'
		}, {
			name : 'image_clip',
			type : 'string'
		}, {
			name : 'total_dist',
			type : 'float'
		}, {
			name : 'total_runtime',
			type : 'integer'
		}, {
			name : 'avg_effcc',
			type : 'float'
		}, {
			name : 'eco_index',
			type : 'integer'
		}, {
			name : 'eco_run_rate',
			type : 'integer'
		}, {
			name : 'run_time_of_month',
			type : 'integer'
		}, {
			name : 'run_dist_of_month',
			type : 'float'
		}, {
			name : 'consmpt_of_month',
			type : 'float'
		}, {
			name : 'effcc_of_month',
			type : 'float'
		}, {
			name : 'eco_drv_time_of_month',
			type : 'integer'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/drivers/summary' : 'assets/app-touch/data/driver_summary.json',
			reader : {
				type : 'json',
				totalProperty : 'total',
				successProperty : 'success'
			}
		}
	}

});