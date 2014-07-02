Ext.define('Base.view.terminology.TerminologyItem', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_terminology_item',
		
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title: T('menu.Terminology'),

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), xtype : 'textfield', hidden : true },
		{ xtype : 'textfield', name : 'name', fieldLabel : T('label.code'), allowBlank : false, maxLength : 21 },
		{ xtype : 'textfield', name : 'description', fieldLabel : T('label.description'), maxLength : 85 },
		{ 
			xtype : 'panel',
			layout: {
				type: 'table',
				columns: 2
			},
			cls : 'columnField column2',
			items: [{
				fieldLabel : T('label.locale'), 
				name : 'locale', 
				flex : 1,
				xtype : 'codecombo', 
				commonCode : 'LOCALE',
				displayField: 'description',
				allowBlank : false
			},{
				name : 'category', 
				fieldLabel : T('label.category'), 
				flex : 1,
				xtype : 'codecombo',
				commonCode : 'TERMS_CATEGORY',
				displayField: 'description',
				allowBlank : false
			} ]
		},
		{ xtype : 'textarea', name : 'display', fieldLabel : T('label.display'), flex : 1 },
		{ xtype : 'textarea', name : 'display_short', fieldLabel : T('label.display_short'), flex: 1 },
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save']
	} ]
});