Ext.define('Base.view.user.UserPopup', {

	extend : 'Frx.common.Popup',

	xtype : 'base_user_popup',

	title : T('title.user'),
	
	height : 430,

	items : [ {
		xtype: 'form',

		defaults : {
			xtype : 'textfield',
			anchor : '100%'
		},

		items : [ {
			xtype : 'hidden',
			name : 'id'
		}, {
			xtype : 'textfield',
			name : 'login',
			fieldLabel : T('label.login'),
			vtype : 'presence',
			allowBlank : false,
			minLength : 4,
			maxLength : 32
		}, {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : T('label.name'),
			vtype : 'presence',
			allowBlank : false,
			minLength : 4,
			maxLength : 64
		}, {
			xtype : 'textfield',
			name : 'email',
			vtype : 'email',
			fieldLabel : T('label.email'),
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'password',
			minLength : 5,
			maxLength : 128,
			fieldLabel: T('label.password'),
			inputType : 'password'
		}, {
			xtype : 'textfield',
			name : 'password_confirmation',
			fieldLabel: T('label.password_confirmation'),
			inputType : 'password',
			minLength : 5,
			maxLength : 128,
			validator: function(value) {
				var pwd = this.previousSibling('[name=password]');
				return (value === pwd.getValue()) ? true : T('text.Passwords do not match')
			}
		}, {
			name : 'locale',
			fieldLabel : T('label.locale'),
			xtype : 'codecombo',
			commonCode : 'LOCALE',
			allowBlank : false
		}, {
			name : 'timezone',
			fieldLabel : T('label.timezone'),
			xtype : 'combo',
			store : 'Base.store.Timezone',
			queryMode : 'local',
			displayField : 'display',
			valueField : 'value',
			allowBlank : false
		}, {
			xtype : 'checkbox',
			name : 'admin_flag',
			inputValue : true,
			fieldLabel : T('label.admin')
		}, {
			xtype : 'checkbox',
			name : 'operator_flag',
			inputValue : true,
			fieldLabel : T('label.operator_flag')
		}, {
			xtype : 'checkbox',
			name : 'active_flag',
			inputValue : true,
			fieldLabel : T('label.active_flag')
		} ]
	} ],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});
