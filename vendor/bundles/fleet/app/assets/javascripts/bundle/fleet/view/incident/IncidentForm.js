Ext.define('Fleet.view.incident.IncidentForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_incident_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { 
		xtype : 'textfield', 
		anchor : '100%',
		labelWidth : 150
	},	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ fieldLabel : T('label.terminal'), name : 'terminal', xtype : 'entityfield', storeClass : 'Fleet.store.Terminal' },
		{ fieldLabel : T('label.vehicle'), name : 'vehicle', xtype : 'entityfield', storeClass : 'Fleet.store.Vehicle' },
		{ fieldLabel : T('label.driver'), name : 'driver', xtype : 'entityfield', storeClass : 'Fleet.store.Driver' },
		{ name : 'lat', fieldLabel : T('label.lat'), xtype : 'numberfield' },
		{ name : 'lng', fieldLabel : T('label.lng'), xtype : 'numberfield' },
		{ name : 'velocity', fieldLabel : T('label.velocity'), xtype : 'numberfield' },
		{ name : 'impulse_x', fieldLabel : T('label.impulse_x', {x : 'X'}), xtype : 'numberfield' },
		{ name : 'impulse_y', fieldLabel : T('label.impulse_x', {x : 'Y'}), xtype : 'numberfield' },
		{ name : 'impulse_z', fieldLabel : T('label.impulse_x', {x : 'Z'}), xtype : 'numberfield' },
		{ name : 'impulse_abs', fieldLabel : T('label.impulse_abs'), xtype : 'numberfield' },
		{ name : 'impulse_threshold', fieldLabel : T('label.impulse_threshold'), xtype : 'numberfield' },
		{ name : 'engine_temp', fieldLabel : T('label.engine_temp'), xtype : 'numberfield' },
		{ name : 'engine_temp_threshold', fieldLabel : T('label.engine_temp_threshold'), xtype : 'numberfield' },
		{ name : 'obd_connected', fieldLabel : T('label.obd'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'confirm', fieldLabel : T('label.confirm'), xtype : 'checkboxfield', inputValue : true },
		{ name : 'video_clip', fieldLabel : T('label.video') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});