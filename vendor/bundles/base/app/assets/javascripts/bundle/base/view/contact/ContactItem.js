Ext.define('Base.view.contact.ContactItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.contact.ContactForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_contact_item',
	
	title : T('menu.Contact'),
	
	items : [ {
		xtype : 'base_contact_form'
	}, {
		xtype : 'base_property_form'
	}, {
		xtype : 'base_attachment_form'
	} ]
});