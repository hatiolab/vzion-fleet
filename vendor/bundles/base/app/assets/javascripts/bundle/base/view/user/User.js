Ext.define('Base.view.user.User', {
	
	extend : 'Frx.common.ListView',
	
	xtype : 'base_user',
		
	title : T('menu.User'),
	
	search : [ {
		name : 'login-like',
		fieldLabel : T('label.login')
	}, {
		name : 'name-like',
		fieldLabel : T('label.name')
	}, {
		name : 'email-like',
		fieldLabel : T('label.email')
	}, {
		name : 'admin_flag-eq',
		fieldLabel : T('label.admin'),
		xtype : 'checkbox',
		inputValue : true,
	}, {
		name : 'operator_flag-eq',
		fieldLabel : T('label.operator_flag'),
		xtype : 'checkbox',
		inputValue : true,
	}, {
		name : 'active_flag-eq',
		fieldLabel : T('label.active_flag'),
		xtype : 'checkbox',
		inputValue : true,
	} ],
	
	store : 'Base.store.User',
	
	columns : [ {
		dataIndex : 'id',
		text : T('label.id'),
		hidden : true
	}, {
		dataIndex : 'login',
		text : T('label.login'),
		width : 100
	}, {
		dataIndex : 'name',
		text : T('label.name'),
		width : 150
	}, {
		dataIndex : 'email',
		text : T('label.email'),
		width : 200
	}, {
		xtype : 'codecolumn',
		dataIndex : 'locale',
		text : T('label.locale'),
		tpl : '{description}',
		commonCode : 'LOCALE',
		width : 90
	}, {
		dataIndex : 'timezone',
		text : T('label.timezone'),
		width : 100
	}, {
		xtype : 'checkcolumn',
		dataIndex : 'admin_flag',
		text : T('label.admin'),
		inputValue : true,
		width : 60
	}, {
		xtype : 'checkcolumn',
		dataIndex : 'operator_flag',
		text : T('label.operator_flag'),
		inputValue : true,
		width : 75
	}, {
		xtype : 'checkcolumn',
		dataIndex : 'active_flag',
		text : T('label.active_flag'),
		inputValue : true,
		width : 55
	}, {
		header : T('label.updater'),
		dataIndex : 'updater',
		xtype : 'entitycolumn'
	}, {
		header : T('label.updated_at'),
		dataIndex : 'updated_at',
		xtype : 'datecolumn',
		format : T('format.datetime'),
		width : 120 
	} ],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [ {
			name : 'login-like',
			fieldLabel : T('label.login')
		}, {
			name : 'name-like',
			fieldLabel : T('label.name')
		}, {
			name : 'email-like',
			fieldLabel : T('label.email')
		}, {
			name : 'admin_flag-eq',
			fieldLabel : T('label.admin'),
			xtype : 'checkbox',
			inputValue : true,
		}, {
			name : 'operator_flag-eq',
			fieldLabel : T('label.operator_flag'),
			xtype : 'checkbox',
			inputValue : true,
		}, {
			name : 'active_flag-eq',
			fieldLabel : T('label.active_flag'),
			xtype : 'checkbox',
			inputValue : true,
		} ]
	}, {
		xtype: 'controlbar',
		items: ['->', 'add', 'delete']
	} ]
});