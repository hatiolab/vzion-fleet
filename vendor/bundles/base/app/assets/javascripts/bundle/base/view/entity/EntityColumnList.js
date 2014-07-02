Ext.define('Base.view.entity.EntityColumnList', {
	
	extend : 'Ext.grid.Panel',
	
	requires : ['Ext.ux.CheckColumn'],
	
	xtype : 'base_entity_column_list',
	
	title : T('title.entity_column'),
	
	store : Ext.create('Ext.data.Store', {
		model : 'Base.model.EntityColumn',

		data : []
	}),
	
	selType : 'cellmodel', 
	
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 1,
        autoCancel : true
    }) ],
	
	columns : [ {
		xtype: 'rownumberer'
	}, {
		header : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, { 
		dataIndex : 'entity_id',
		hidden : true
	}, { 
		dataIndex : 'name',
		header : T('label.name'),
		width : 100,
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, { 
		dataIndex : 'description',
		header : T('label.description'),
		width : 100,
		editor : {
			xtype : 'textfield'
		}
	}, { 
		dataIndex : 'ref_type',
		header : T('label.ref_type'),
		width : 90,
		editor : {
			xtype : 'codecombo', 
			commonCode : 'ENTITY_REF_TYPE'
		}
	}, { 
		dataIndex : 'ref_name',
		width : 80,
		header : T('label.ref_name'),
		editor : {
			xtype: 'textfield'
		}
	}, { 
		dataIndex : 'column_type',
		header : T('label.type'),
		width : 70,
		editor : {
			allowBlank: false,
			xtype : 'codefield', 
			commonCode : 'ENTITY_FIELD_TYPE'
		}
	}, { 
		dataIndex : 'pk',
		header : T('label.pk'),
		width : 40,
		xtype: 'checkcolumn'
	}, { 
		dataIndex : 'editable',
		header : T('label.editable'),
		width : 70,
		xtype: 'checkcolumn'
	}, { 
		dataIndex : 'list_rank',
		header : T('label.list_rank'),
		width : 80,
		editor : {
			xtype: 'numberfield'
		}
	}, { 
		dataIndex : 'search_rank',
		header : T('label.search_rank'),
		width : 95,
		editor : {
			xtype: 'numberfield'
		}
	}, { 
		dataIndex : 'sort_rank',
		header : T('label.sort_rank'),
		width : 85,
		editor : {
			xtype: 'numberfield'
		}
	}, { 
		dataIndex : 'reverse_sort',
		header : T('label.reverse_sort'),
		width : 95,
		xtype: 'checkcolumn'
	}, { 
		dataIndex : 'display_rank',
		header : T('label.display_rank'),
		width : 95,
		editor : {
			xtype: 'numberfield'
		}
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'locale', 'create', 'add', 'save', 'delete']
	} ]
});