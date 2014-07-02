Ext.define('Base.view.common_code.CommonCodeList', {

	extend : 'Ext.grid.Panel',
	
	xtype : 'base_common_code_list',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title : T('label.code_list'),

	store : 'Base.store.SubCode',
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 1,
        autoCancel : true
    }) ],
	
	columns : [ { 
		header : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, { 
		dataIndex : 'parent_id', 
		hidden : true
	}, { 
		dataIndex : 'name', 
		header : T('label.name'),
		flex : 1,
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, { 
		dataIndex : 'description', 
		header : T('label.description'),
		flex : 2,
		editor : {
			xtype: 'textfield'
		}
	}, { 
		header : T('label.updater'),
		dataIndex : 'updater',
		xtype : 'entitycolumn'
	}, { 
		dataIndex : 'updated_at', 
		header : T('label.updated_at'), 
		xtype : 'datecolumn', 
		format : T('format.datetime'), 
		width : 120 
	} ],
	
	selModel : Ext.create('Ext.selection.CheckboxModel'),
		
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]

});