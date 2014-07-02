Ext.define('Fleet.view.driver.DriverForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_driver_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.id'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.name'), maxLength : 255 },
		{ name : 'social_id', fieldLabel : T('label.social_id') },
		{ name : 'division', fieldLabel : T('label.division') },
		{ name : 'title', fieldLabel : T('label.title') },
		{ name : 'phone_no', fieldLabel : T('label.phone') },
		{ name : 'mobile_no', fieldLabel : T('label.mobile') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});