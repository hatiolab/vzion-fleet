Ext.define('Fleet.view.repair.RepairForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'fleet_repair_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'vehicle', xtype : 'entityfield', fieldLabel : T('label.vehicle'), storeClass : 'Fleet.store.Vehicle' },
		{ name : 'next_repair_date', xtype : 'datefield', fieldLabel : T('label.x_date', {x : T('label.next_repair')}), format : T('format.date'), submitFormat : T('format.submitDate') },
		{ name : 'repair_date', xtype : 'datefield', fieldLabel : T('label.x_date', {x : T('label.repair')}), format : T('format.date'), submitFormat : T('format.submitDate') },
		{ name : 'repair_man', fieldLabel : T('label.repair_man') },
		{ name : 'repair_mileage', fieldLabel : T('label.repair_mileage'), xtype : 'numberfield', minValue : 0 },
		{ name : 'repair_shop', fieldLabel : T('label.repair_shop') },
		{ name : 'repair_time', fieldLabel : T('label.repair_time'), xtype : 'numberfield', minValue : 0 },
		{ name : 'cost', fieldLabel : T('label.cost'), xtype : 'numberfield', minValue : 0 },
		{ name : 'content', fieldLabel : T('label.content') },
		{ name : 'comment', fieldLabel : T('label.comment') },
		{ name : 'oos', fieldLabel : T('label.oos') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});