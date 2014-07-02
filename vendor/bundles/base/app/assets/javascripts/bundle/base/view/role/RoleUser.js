Ext.define('Base.view.role.RoleUser', {
	
	extend : 'Ext.grid.Panel',
	
	requires : ['Ext.ux.CheckColumn'],
	
	xtype : 'base_role_user',
	
	title : T('title.user'),
		
	store : Ext.create('Ext.data.Store', {
		fields : [
			{ name : 'login', 		type : 'string' },
			{ name : 'name', 		type : 'string' },
			{ name : 'email', 		type : 'string' },
			{ name : '_cud_flag_', 	type : 'string' }
		]
	}),
	
	verticalScroller : { variableRowHeight: true },
	
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
	selType : 'cellmodel', 
	
	columns : [ { 
		dataIndex : 'id',
		text : T('label.id'),
		hidden : true
	}, {
		dataIndex : 'login',
		text : T('label.login'),
		width : 150
	}, {
		dataIndex : 'name',
		text : T('label.name'),
		flex : 1
	}, {
		dataIndex : 'email',
		text : T('label.email'),
		flex : 1
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'delete']
	} ],
	
	selectUsers : function(selections) {
		this.fireEvent('add_role_users', this, selections);
	}
});
