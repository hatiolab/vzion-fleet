Ext.define('Fleet.view.vehicle.ReplacementPopup', {

	extend : 'Frx.common.Popup',

	xtype : 'fleet_vehicle_replace_popup',
	
	width : 600,
	
	height : 400,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'form',

		defaults : {
			xtype : 'textfield',
			anchor : '100%',
			labelWidth : 130
		},

		items : [
			{ name : 'vehicle_consumable_id', hidden : true },
			{ name : 'vehicle_id', hidden : true },
			{ fieldLabel : T('label.vehicle'), 								name : 'vehicle', 		readOnly : true },
			{ fieldLabel : T('label.item'), 								name : 'name',			readOnly : true },
			{ fieldLabel : T('label.x_repl_mile', {x : T('label.last')}),	name : 'last_repl_mile', xtype : 'numberfield' },
			{ fieldLabel : T('label.x_repl_date', {x : T('label.last')}),	name : 'last_repl_date', xtype : 'datefield', format : T('format.date'), submitFormat : 'Y-m-d' },
			{ fieldLabel : T('label.cost'), 								name : 'repl_cost', 	xtype : 'numberfield' },
			{ fieldLabel : T('label.worker'), 								name : 'worker', 		},
			{ fieldLabel : T('label.component'), 							name : 'component', 	},
			{ fieldLabel : T('label.comment'), 								name : 'comment',		xtype : 'textarea' }
		]
	} ],

	dockedItems : [ {
		xtype : 'controlbar',
		items : ['->', 'ok', 'close']
	} ]
});
