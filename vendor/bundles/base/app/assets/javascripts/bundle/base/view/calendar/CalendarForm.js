Ext.define('Base.view.calendar.CalendarForm', {
	
	extend : 'Ext.form.Panel',
	
	title : T('title.basic_info'),
	
	xtype : 'base_calendar_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'name', fieldLabel : T('label.name'), allowBlank : false, maxLength : 64 },
		{ name : 'description', fieldLabel : T('label.description'), maxLength : 255 },
		{
			xtype: 'panel',
			layout: 'table',
			fieldLabel: 'days',
			columns: 7,
			cls : 'calendarSettingTable',
			items: [
				{ xtype: 'text', text : T('label.day1')},
				{ xtype: 'text', text : T('label.day2')},
				{ xtype: 'text', text : T('label.day3')},
				{ xtype: 'text', text : T('label.day4')},
				{ xtype: 'text', text : T('label.day5')},
				{ xtype: 'text', text : T('label.day6')},
				{ xtype: 'text', text : T('label.day7')}
			]
		},
		{
			xtype: 'checkboxgroup',
			fieldLabel: 'day off',
			cls : 'calendarSettingTableCell',
			columns: 7,
			items: [
				{ name : 'day1_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day2_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day3_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day4_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day5_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day6_off_flag', xtype : 'checkboxfield', inputValue : true },
				{ name : 'day7_off_flag', xtype : 'checkboxfield', inputValue : true },
			]
		},
		{
			xtype: 'fieldcontainer',
			fieldLabel: 'work hour',
			layout: 'hbox',
			cls : 'calendarSettingTableCell1',
			defaults: {
		            margin: '4 2 3 2'
		        },
			items: [
				{ name : 'day1_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day2_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day3_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day4_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day5_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day6_workhour', xtype : 'numberfield',flex: 1 },
				{ name : 'day7_workhour', xtype : 'numberfield',flex: 1 },
			]
		},
		{ xtype : 'timestamp' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save', 'delete']
	} ]
});