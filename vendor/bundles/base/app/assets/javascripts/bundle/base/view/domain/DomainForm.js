Ext.define('Base.view.domain.DomainForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_domain_form',
	
	title : T('title.basic_info'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), readOnly : true },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{ 
			name : 'timezone', 
			fieldLabel : T('label.timezone'), 
			xtype: 'combo',
			store: 'Base.store.Timezone',
			queryMode: 'local',
			displayField: 'display',
			valueField: 'value',
			allowBlank : false
		},
		{ 
			name : 'system_flag', 
			fieldLabel : T('label.system_domain'), 
			xtype : 'checkboxfield', 
			readOnly : true, 
			inputValue : true 
		},
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save']
	} ]
});