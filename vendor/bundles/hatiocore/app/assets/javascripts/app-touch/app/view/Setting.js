Ext.define('FleetTouch.view.Setting', {
	
    extend : 'Ext.form.Panel',

    xtype : 'setting',

	constructor : function(config) {
		config.items = this.buildItems();
		
		this.callParent(arguments);
		
		this.on('erased', function() {
			this.destroy();
		});
	},
	
	buildItems : function() {
		var items = [{
			xtype : 'fieldset',
			items : [{
	            xtype: 'toolbar',
	            title: T('label.setting'),
	            docked: 'top'
	        },
	        {
	            xtype: 'togglefield',
	            label: T('label.autofit'),
	            name: 'autofit',
	            value: FleetTouch.setting.get('autofit'),
				listeners : {
					change : function(field, slider, thumb, newVal) {
						FleetTouch.setting.set(field.getName(), !!newVal);
					}
				}
	        },
	        {
	            xtype: 'selectfield',
	            label: T('label.refreshterm'),
	            name: 'refreshTerm',
	            valueField: 'value',
	            displayField: 'display',
				value : FleetTouch.setting.get('refreshTerm'),
				listeners : {
					change : function(field, newVal) {
						FleetTouch.setting.set(field.getName(), newVal);
					}
				},
	            store: {
	                data: [{
	                    value: -1,
	                    display: T('label.refresh_none')
	                },
	                {
	                    value: 3,
	                    display: '3' + T('label.second_s')
	                },
	                {
	                    value: 5,
	                    display: '5' + T('label.second_s')
	                },
	                {
	                    value: 10,
	                    display: '10' + T('label.second_s')
	                },
	                {
	                    value: 30,
	                    display: '30' + T('label.second_s')
	                },
	                {
	                    value: 60,
	                    display: '1' + T('label.minute_s')
	                },
	                {
	                    value: 300,
	                    display: '5' + T('label.minute_s')
	                }]
	            }
	        },
	        {
	            xtype: 'selectfield',
	            label: T('label.dockPosition'),
	            name: 'dockPosition',
	            valueField: 'value',
	            displayField: 'display',
				value : FleetTouch.setting.get('dockPosition'),
				listeners : {
					change : function(field, newVal) {
						FleetTouch.setting.set(field.getName(), newVal);
					}
				},
	            store: {
	                data: [{
	                    value: 'left',
	                    display: T('label.left')
	                },
	                {
	                    value: 'right',
	                    display: T('label.right')
	                }]
	            }
			}]
        }, {
			xtype: 'button',
			text: T('label.logout'),
			docked: 'bottom',
			listeners: {
				tap: function() {
					Ext.Msg.confirm('Logout', 'Are you sure you want to be signed out ?', function(confirm) {
						if (confirm === 'yes') {
							document.location.href = '/logout';
						}
					});
				}
			}
		}];
		
		var byscreen = this.buildByScreen();
		
		if(byscreen) {
			items.push(byscreen);
		}
		
		items.push(this.buildInformation());
		
		return items;
	},
	
	buildByScreen : function() {
		var cont = Ext.getCmp('content');
		var settings = [];
		
		while(cont && typeof(cont.getActiveItem) === 'function') {
			cont = cont.getActiveItem();
			if(!cont)
				break;
			if(cont.buildSettings && typeof(cont.buildSettings) === 'function')
				settings = Ext.Array.merge(settings, cont.buildSettings());
		}

		if(settings.length)
			return {
				xtype : 'fieldset',
				title : T('label.setting_by_screen'),
				items : settings
			}
		else
			return null;
	},
	
	buildInformation : function() {
		return {
			xtype : 'fieldset',
			title : T('label.system_info'),
			items : [{
	            xtype: 'textfield',
	            label: T('label.version'),
	            value : FleetTouch.setting.get('version'),
				disabled : true
	        }, {
	            xtype: 'textfield',
	            label: T('label.user'),
	            value : FleetTouch.login.get('name') + '(' + FleetTouch.login.get('email') + ')',
				disabled : true
	        }, {
	            xtype: 'textfield',
	            label: T('label.company'),
	            value : FleetTouch.login.get('company'),
				disabled : true
			}]
		}
	},
	
    config: {
        left: 0,
        top: 0,

        modal: true,

		showAnimation : 'fadeIn',
        hideOnMaskTap: true,
		hideAnimation : 'fadeOut',

        width: 400,
        height: 500,
        scrollable: true
    }
});