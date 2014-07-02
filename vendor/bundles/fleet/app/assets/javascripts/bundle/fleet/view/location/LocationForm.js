Ext.define('Fleet.view.location.LocationForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_location_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ name : 'address', fieldLabel : T('label.address') },
		{ name : 'radius', fieldLabel : T('label.radius'), xtype : 'numberfield' },
		{ name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield' },
		{ name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield' },
		{ name : 'lat_hi', fieldLabel : T('label.lat_hi'), xtype : 'numberfield' },
		{ name : 'lat_low', fieldLabel : T('label.lat_low'), xtype : 'numberfield' },
		{ name : 'lng_hi', fieldLabel : T('label.lng_hi'), xtype : 'numberfield' },
		{ name : 'lng_low', fieldLabel : T('label.lng_low'), xtype : 'numberfield' },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});