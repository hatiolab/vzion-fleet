Ext.define('Fleet.view.vehicle.VehicleForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_vehicle_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.reg_no'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'model', fieldLabel : T('label.model') },
		{ fieldLabel : T('label.vendor'), name : 'vendor', xtype : 'codefield', commonCode : 'V_VENDOR' },
		{ fieldLabel : T('label.classicfication'), name : 'classicfication', xtype : 'codefield', commonCode : 'V_CLASS' },
		{ fieldLabel : T('label.fuel_type'), name : 'fuel_type', xtype : 'codefield', commonCode : 'V_FUEL' },
		{ fieldLabel : T('label.ownership'), name : 'ownership', xtype : 'codefield', commonCode : 'V_OWNERSHIP' },
		{ name : 'birth_year', fieldLabel : T('label.birth_year'), xtype : 'numberfield' },
		{ name : 'seat_size', fieldLabel : T('label.seat_size'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});