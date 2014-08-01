Ext.define('Fleet.view.vehicle_checkin.VehicleCheckinForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_checkin_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 150
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
				{ fieldLabel : T('label.terminal'), name : 'terminal', xtype : 'entityfield', storeClass : 'Fleet.store.Terminal' },
				{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
				{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
				{ xtype : 'datefield', name : 'run_date', fieldLabel : T('label.run_date'), format : T('format.date') },
				{ xtype : 'datefield', name : 'start_time', fieldLabel : T('label.start_time'), format : T('format.datetime') },
				{ name : 'run_dist', fieldLabel : T('label.run_dist'), xtype : 'numberfield' },
				{ name : 'run_time', fieldLabel : T('label.run_time'), xtype : 'numberfield' },
				{ name : 'idle_time', fieldLabel : T('label.idle_time'), xtype : 'numberfield' },
				{ name : 'eco_drv_time', fieldLabel : T('label.eco_drv_time'), xtype : 'numberfield' },
				{ name : 'ovr_spd_time', fieldLabel : T('label.ovr_spd_time'), xtype : 'numberfield' },
				{ name : 'fuel_consmpt', fieldLabel : T('label.fuel_consmpt'), xtype : 'numberfield' },
				{ name : 'fuel_effcc', fieldLabel : T('label.fuel_effcc'), xtype : 'numberfield' },
				{ name : 'co2_emss', fieldLabel : T('label.co2_emss'), xtype : 'numberfield' },
				{ name : 'max_cool_water_temp', fieldLabel : T('label.max_cool_water_temp'), xtype : 'numberfield' },
				{ name : 'avg_battery_volt', fieldLabel : T('label.avg_battery_volt'), xtype : 'numberfield' },
				{ name : 'sud_accel_cnt', fieldLabel : T('label.sud_accel_cnt'), xtype : 'numberfield' },
				{ name : 'sud_brake_cnt', fieldLabel : T('label.sud_brake_cnt'), xtype : 'numberfield' }
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
				{ name : 'avg_speed', fieldLabel : T('label.avg_speed'), xtype : 'numberfield' },
				{ name : 'max_speed', fieldLabel : T('label.max_speed'), xtype : 'numberfield' },
				{ name : 'spd_lt_10',  fieldLabel : T('label.spd_lt_x', {x : '10'}), xtype : 'numberfield' },
				{ name : 'spd_lt_20',  fieldLabel : T('label.spd_lt_x', {x : '20'}), xtype : 'numberfield' },
				{ name : 'spd_lt_30',  fieldLabel : T('label.spd_lt_x', {x : '30'}), xtype : 'numberfield' },
				{ name : 'spd_lt_40',  fieldLabel : T('label.spd_lt_x', {x : '40'}), xtype : 'numberfield' },
				{ name : 'spd_lt_50',  fieldLabel : T('label.spd_lt_x', {x : '50'}), xtype : 'numberfield' },
				{ name : 'spd_lt_60',  fieldLabel : T('label.spd_lt_x', {x : '60'}), xtype : 'numberfield' },
				{ name : 'spd_lt_70',  fieldLabel : T('label.spd_lt_x', {x : '70'}), xtype : 'numberfield' },
				{ name : 'spd_lt_80',  fieldLabel : T('label.spd_lt_x', {x : '80'}), xtype : 'numberfield' },
				{ name : 'spd_lt_90',  fieldLabel : T('label.spd_lt_x', {x : '90'}), xtype : 'numberfield' },
				{ name : 'spd_lt_100', fieldLabel : T('label.spd_lt_x', {x : '100'}), xtype : 'numberfield' },
				{ name : 'spd_lt_110', fieldLabel : T('label.spd_lt_x', {x : '110'}), xtype : 'numberfield' },
				{ name : 'spd_lt_120', fieldLabel : T('label.spd_lt_x', {x : '120'}), xtype : 'numberfield' },
				{ name : 'spd_lt_130', fieldLabel : T('label.spd_lt_x', {x : '130'}), xtype : 'numberfield' },
				{ name : 'spd_lt_140', fieldLabel : T('label.spd_lt_x', {x : '140'}), xtype : 'numberfield' },
				{ name : 'spd_lt_150', fieldLabel : T('label.spd_lt_x', {x : '150'}), xtype : 'numberfield' },
				{ name : 'spd_lt_160', fieldLabel : T('label.spd_lt_x', {x : '160'}), xtype : 'numberfield' }
			]
		}]
	}, {
		xtype : 'timestamp'
	}],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});