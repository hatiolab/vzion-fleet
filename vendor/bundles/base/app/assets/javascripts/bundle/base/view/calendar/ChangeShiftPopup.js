Ext.define('Base.view.calendar.ChangeShiftPopup', {

	extend : 'Frx.common.Popup',

	xtype : 'base_change_shift_popup',

	title : T('title.change_shift'),
	
	height : 365,

	layout: {
        type: 'vbox',
        align: 'center'  
    },
    items: [
    	{ 
    		xtype: 'fieldset',
            title: T('title.apply_date'),
            defaultType: 'textfield',
            layout: {
	            type: 'vbox',
	            align: 'center'  
	        },
            width:700,
            items:[
            	{
            		xtype: 'daterange', 
		    		fieldLabel: T('label.work_date'), 
		    		name: 'work_date', 
		    		from_value: new Date(Date.now()), to_value: new Date("Dec 31" + ", " + (new Date().getFullYear('YYYY')+1)) 
            	}
            ]
    	},
    	
    	{
            xtype: 'fieldset',
            title: T('title.shift'),
            defaultType: 'textfield',
            layout: 'anchor',
            width:700,
	        items: [
	            {
                	xtype: 'container',
                	layout: 'hbox',
                	margin: '0 0 5 0',
                	items: [{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift1_start'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftStartHour1',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftStartMin1',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;',
		                           }
		                        ]
					        },
					        {
					            xtype:'tbspacer',
					            width:50
					        },
			            	{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift1_end'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftEndHour1',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftEndMin1',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        }
	                ]
            	}, {
                	xtype: 'container',
                	layout: 'hbox',
                	margin: '0 0 5 0',
                	items: [{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift2_start'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftStartHour2',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftStartMin2',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        },
					        {
					            xtype:'tbspacer',
					            width:50
					        },
			            	{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift2_end'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftEndHour2',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftEndMin2',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        }
	                ]
            	}, {
                	xtype: 'container',
                	layout: 'hbox',
                	margin: '0 0 5 0',
                	items: [{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift3_start'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftStartHour3',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftStartMin3',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        },
					        {
					            xtype:'tbspacer',
					            width:50
					        },
			            	{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift3_end'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftEndHour3',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftEndMin1',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        }
	                ]
            	}, {
                	xtype: 'container',
                	layout: 'hbox',
                	margin: '0 0 5 0',
                	items: [{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift4_start'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftStartHour4',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftStartMin4',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        },
					        {
					            xtype:'tbspacer',
					            width:50
					        },
			            	{
					            xtype: 'fieldcontainer',
					            layout: 'hbox',
		                        fieldLabel: T('label.shift4_end'),
		                        combineErrors: false,
		                        defaults: {
		                            hideLabel: true
		                        },
		                   		items: [
		                           {
		                               name : 'shiftEndHour4',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 23,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;H&nbsp;'
		                           },
		                           {
		                               name : 'shiftEndMin4',
		                               xtype: 'numberfield',
		                               width: 60,
		                               allowBlank: false,
		                               maxValue: 59,
        							   minValue: 0
		                           },
		                           {
		                               xtype: 'displayfield',
		                               value: '&nbsp;M&nbsp;'
		                           }
		                        ]
					        }
	                ]
            	}
            ]
        }
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save']
	} ]
});