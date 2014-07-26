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
		{ name : 'vendor', fieldLabel : T('label.vendor'), xtype : 'codefield', commonCode : 'V_VENDOR' },
		{ name : 'classicfication', fieldLabel : T('label.classicfication'), xtype : 'codefield', commonCode : 'V_CLASS' },
		{ name : 'fuel_type', fieldLabel : T('label.fuel_type'), xtype : 'codefield', commonCode : 'V_FUEL' },
		{ name : 'ownership', fieldLabel : T('label.ownership'), xtype : 'codefield', commonCode : 'V_OWNERSHIP' },
		{ name : 'birth_year', fieldLabel : T('label.birth_year'), xtype : 'numberfield' },
		{ name : 'seat_size', fieldLabel : T('label.seat_size'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});