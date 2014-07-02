Ext.define('Base.view.domain.DomainShiftForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_domain_shift_form',
	
	title : T('title.shift'),
	
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name') },
		{ name : 'total_shift', fieldLabel : T('label.total_shift') },
		{
			xtype: 'panel',
			layout: 'table',
			fieldLabel: 'days',
			columns: 3,
			cls : 'shiftSettingTable',
			items: [
				{ xtype: 'text', text : T('label.shift1')},
				{ xtype: 'text', text : T('label.shift2')},
				{ xtype: 'text', text : T('label.shift3')}
			]
		},
		
		{
			xtype: 'fieldcontainer',
			fieldLabel: T('label.startend'),
			layout: 'hbox',
			cls : 'shiftSettingTableCell1',
			defaults: {
		            margin: '4 2 3 2'
		        },
			items: [
				{ name : 'shift1_start', xtype : 'textfield',flex: 1 },
				{ xtype: 'text', text : "~"},
				{ name : 'shift1_end', xtype : 'textfield',flex: 1 },
				{ xtype: 'splitter'}, 
				{ name : 'shift2_start', xtype : 'textfield',flex: 1 },
				{ xtype: 'text', text : "~"},
				{ name : 'shift2_end', xtype : 'textfield',flex: 1 },
				{ xtype: 'splitter'}, 
				{ name : 'shift3_start', xtype : 'textfield',flex: 1 },
				{ xtype: 'text', text : "~"},
				{ name : 'shift3_end', xtype : 'textfield',flex: 1 }
			]
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save']
	} ]
});