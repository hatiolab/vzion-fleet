Ext.define('Fleet.view.vehicle_run_sum.VehicleRunSumForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_run_sum_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 170
	},
	
	items : [{
		xtype : 'container',
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [{
			xtype : 'container',
			flex : 1.9,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [
				{ name : 'id', fieldLabel : T('label.id'), hidden : true },
				{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle', readOnly : true },
				{ name : 'run_year', fieldLabel : T('label.year'), xtype : 'numberfield', readOnly : true },
				{ name : 'run_month', fieldLabel : T('label.month'), xtype : 'numberfield', readOnly : true },
				{ name : 'run_dist', fieldLabel : T('label.run_dist'), xtype : 'numberfield' },
				{ name : 'run_time', fieldLabel : T('label.run_time'), xtype : 'numberfield' },
				{ name : 'idle_time', fieldLabel : T('label.idle_time'), xtype : 'numberfield' },
				{ name : 'eco_drv_time', fieldLabel : T('label.eco_drv_time'), xtype : 'numberfield' },
				{ name : 'ovr_spd_time', fieldLabel : T('label.ovr_spd_time'), xtype : 'numberfield' },
				{ name : 'mnt_time', fieldLabel : T('label.mnt_time'), xtype : 'numberfield' }
			]
		}, {
			xtype : 'container',
			flex : 0.2,
			layout : {
				type : 'vbox',
				align : 'stretch'
			}
		}, {
			xtype : 'container',
			flex : 1.9,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [
				{ name : 'consmpt', fieldLabel : T('label.consmpt'), xtype : 'numberfield' },
				{ name : 'co2_emss', fieldLabel : T('label.co2_emss'), xtype : 'numberfield' },
				{ name : 'effcc', fieldLabel : T('label.effcc'), xtype : 'numberfield' },
				{ name : 'eco_index', fieldLabel : T('label.eco_index'), xtype : 'numberfield' },
				{ name : 'sud_accel_cnt', fieldLabel : T('label.sud_accel_cnt'), xtype : 'numberfield' },
				{ name : 'sud_brake_cnt', fieldLabel : T('label.sud_brake_cnt'), xtype : 'numberfield' },
				{ name : 'inc_cnt', fieldLabel : T('label.inc_cnt'), xtype : 'numberfield' },
				{ name : 'oos_cnt', fieldLabel : T('label.oos_cnt'), xtype : 'numberfield' },
				{ name : 'mnt_cnt', fieldLabel : T('label.mnt_cnt'), xtype : 'numberfield' }
			]
		}]
	}],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});