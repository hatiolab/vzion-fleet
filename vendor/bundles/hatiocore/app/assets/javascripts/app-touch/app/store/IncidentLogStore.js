Ext.define('FleetTouch.store.IncidentLogStore', {
	extend : 'Ext.data.Store',
	
	config : {
		autoLoad : false,

		pageSize : 1000,
		
		remoteFilter : true,
		  
		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'domain_id',
			type : 'string'
		}, {
			name : 'terminal_id',
			type : 'string'
		}, {
			name : 'vehicle_id',
			type : 'string'
		}, {
			name : 'driver_id',
			type : 'string'
		}, {
			name : 'incident_id',
			type : 'string'
		}, {
			name : 'incident_date',
			type : 'date',
			dateFormat:'time'
		}, {
			name : 'lat',
			type : 'float'
		}, {
			name : 'lng',
			type : 'float'
		}, {
			name : 'velocity',
			type : 'float'
		}, {
			name : 'accelate_x',
			type : 'float'
		}, {
			name : 'accelate_y',
			type : 'float'
		}, {
			name : 'accelate_z',
			type : 'float'
		}, {
			name : 'creator_id',
			type : 'string'
		}, {
			name : 'updater_id',
			type : 'string'
		}, {
			name : 'created_at',
			type : 'date',
			dateFormat:'time'
		}, {
			name : 'updated_at',
			type : 'date',
			dateFormat:'time'
		} ],

		sorters : [ {
			property : 'datetime',
			direction : 'ASC'
		} ],

		proxy : {
			type : 'ajax',
			// 일단 에러 나지 않게 수정함. TODO Controller에서 id 파라미터 수정
			url : window.location.pathname.indexOf(contextPath) === 0 ? '/incidents/incident_logs?id=1' : 'assets/app-touch/data/incident_log.json',
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}
	}
});