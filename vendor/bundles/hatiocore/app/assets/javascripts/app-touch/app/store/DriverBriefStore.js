Ext.define('FleetTouch.store.DriverBriefStore', {
	
	extend : 'Ext.data.Store',

	config : {
		autoLoad : false,

		pageSize : 1000,

		fields : [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'image_clip',
			type : 'string'
		} ],

		proxy : {
			type : 'ajax',
			url : window.location.pathname.indexOf(contextPath) === 0 ? 'drivers' : 'assets/app-touch/data/driver_brief.json',
			extraParams : {
				select : [ 'id', 'name', 'description', 'image_clip' ]
			},
			reader : {
				type : 'json',
				rootProperty : 'items',
				totalProperty : 'total'
			}
		}		
	}

});