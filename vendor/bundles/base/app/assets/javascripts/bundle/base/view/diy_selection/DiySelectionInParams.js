Ext.define('Base.view.diy_selection.DiySelectionInParams', {
	
	extend : 'Ext.grid.Panel',
	
	xtype : 'base_diy_selection_in_params_list',
	
	title : T('title.in_parameters'),
	
	store : Ext.create('Ext.data.Store', {
		model : 'Base.model.ServiceInParam',
		data : []
	}),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 1,
        autoCancel : true
    }) ],

	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
	columns : [ {
		header : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, { 
		dataIndex : 'resource_type',
		hidden : true
	}, { 
		dataIndex : 'resource_id',
		hidden : true
	}, { 
		dataIndex : 'rank',
		header : T('label.rank'),
		width : 50,
		align : 'right',
		editor : {
			xtype: 'numberfield'
		}
	}, { 
		dataIndex : 'name',
		header : T('label.name'),
		width : 200,
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, { 
		dataIndex : 'description',
		header : T('label.description'),
		flex : 1,
		editor : {
			xtype : 'textfield'
		}
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ],
	
	setRecord : function(record) {
		this.store.loadRawData(record.get('service_in_params'));
	}
});