Ext.define('Base.view.role.RoleItem', {
	extend : 'Ext.tab.Panel',
	
	xtype : 'base_role_item',
	
	requires : [ 
		'Base.view.role.RoleForm',
		'Base.view.role.RoleUser',
		'Base.view.role.RolePermissions'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('menu.Role'),
	
	items : [ {
		xtype : 'base_role_form'
	}, {
		xtype : 'base_role_permissions'
	}, {
		xtype : 'base_role_user'
	} ]
});