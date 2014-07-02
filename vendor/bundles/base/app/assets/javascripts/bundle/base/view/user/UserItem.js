Ext.define('Base.view.user.UserItem', {

	extend : 'Ext.form.Panel',
	
	xtype : 'base_user_item',
		
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.User'),
	
	autoScroll : true,
	
	defaults : {
		anchor : '100%'
	},

	items: [{
		xtype: 'hidden',
		name: 'id'
	}, {
		xtype: 'textfield',
		name: 'login',
		fieldLabel: T('label.login'),
		vtype : 'presence'
	}, {
		xtype: 'textfield',
		name: 'name',
		fieldLabel: T('label.name')
	}, {
		xtype: 'textfield',
		name: 'email',
		vtype: 'email',
		fieldLabel: T('label.email')
	}, {
		xtype: 'textfield',
		name: 'password',
		fieldLabel: T('label.password'),
		inputType: 'password'
	}, {
		xtype: 'textfield',
		name: 'password_confirmation',
		fieldLabel: T('label.password_confirmation'),
		inputType: 'password',
		validator: function(value) {
			var pwd = this.previousSibling('[name=password]');
			return (value === pwd.getValue()) ? true : T('text.Passwords do not match')
		}
	}, {
		name: 'locale',
		fieldLabel: T('label.locale'),
		xtype: 'codecombo',
		commonCode: 'LOCALE'
	}, {
		name: 'timezone',
		fieldLabel: T('label.timezone'),
		xtype: 'combo',
		store: 'Base.store.Timezone',
		queryMode: 'local',
		displayField: 'display',
		valueField: 'value'
	}, {
		xtype: 'checkbox',
		name: 'admin_flag',
		inputValue : true,
		fieldLabel: T('label.admin')
	}, {
		xtype: 'checkbox',
		name: 'operator_flag',
		inputValue : true,
		fieldLabel: T('label.operator_flag')
	}, {
		xtype: 'checkbox',
		name: 'active_flag',
		inputValue : true,
		fieldLabel: T('label.active_flag')
	}],

	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'list', 'save']
	}]
});
