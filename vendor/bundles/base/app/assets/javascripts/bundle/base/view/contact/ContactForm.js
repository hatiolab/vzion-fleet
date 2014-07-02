Ext.define('Base.view.contact.ContactForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_contact_form',
	
	title : T('title.basic_info'),
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description') },
		{ name : 'family_name', fieldLabel : T('label.family_name') },
		{ name : 'given_name', fieldLabel : T('label.given_name'), allowBlank : false },
		{ name : 'company', fieldLabel : T('label.company') },
		{ name : 'department', fieldLabel : T('label.department') },
		{ name : 'title', fieldLabel : T('label.title') },
		{ name : 'email', fieldLabel : T('label.email') },
		{ name : 'phone_office', fieldLabel : T('label.phone_office') },
		{ name : 'phone_mobile', fieldLabel : T('label.phone_mobile') },
		{ name : 'fax', fieldLabel : T('label.fax') },
		{ xtype : 'textareafield', name : 'address', fieldLabel : T('label.address') },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});