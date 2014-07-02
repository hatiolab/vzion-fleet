Ext.define('Base.view.menu.MenuItem', {
	
	extend : 'Ext.grid.Panel',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_menu_item',
		
	title : T('menu.Menu'),

	store : 'Base.store.SubMenu',
	
	sortableColumns : false,
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 1
    }) ],
	
	columns : [ 
		{ header : T('label.id'), dataIndex : 'id', width : 45, hidden : true, menuDisabled : true },
		{ 
			header : T('label.rank'), 
			dataIndex : 'rank', 
			xtype : 'numbercolumn', 
			format : T('format.number'), 
			width : 55, 
			align : 'right',
			menuDisabled : true,
			editor : { 
				xtype : 'numberfield', 
				minValue : 0 
			}
		},
		{ 
			header : T('label.code'), 
			dataIndex : 'name',
			width : 120,
			menuDisabled : true,
			editor : { 
				xtype : 'textfield', 
				allowBlank : false,
				minLength : 2,
				maxLength : 60
			}
		},
		{ 
			header : T('label.name'), 
			dataIndex : 'name', 
			width : 120, 
			menuDisabled : true,
			renderer : function(val) {
				return T('menu.' + val);
			} 
		},		
		{ 
			header : T('label.description'), 
			dataIndex : 'description', 
			width : 150,
			menuDisabled : true,
			editor : { 
				xtype : 'textfield', 
				allowBlank : true,
				maxLength : 255
			} 
		},
		{ 
			header : T('label.category'), 
			dataIndex : 'category', 
			menuDisabled : true,
			editor : { 
				xtype : 'codecombo', 
				commonCode : 'MENU_CATEGORY',
				allowBlank : false 
			} 
		},
		{ 
			header : T('label.type'), 
			dataIndex : 'menu_type', 
			menuDisabled : true,
			width : 85, 
			editor : { 
				xtype : 'codecombo', 
				commonCode : 'MENU_TYPE',
				allowBlank : false
			} 
		},
		{ 
			header : T('label.screen_id'), 
			dataIndex : 'template', 
			menuDisabled : true,
			width : 250, 
			editor : { 
				xtype : 'textfield', 
				maxLength : 128 
			} 
		},
		{ 
			header : T('label.hidden_flag'), 
			dataIndex : 'hidden_flag', 
			xtype : 'checkcolumn', 
			menuDisabled : true,
			width : 60
		}
	 ],
	
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]

});