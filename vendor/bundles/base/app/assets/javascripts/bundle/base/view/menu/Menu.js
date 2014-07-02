Ext.define('Base.view.menu.Menu', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_menu',
	
	title : T('menu.Menu'),
	
	store : 'Base.store.Menu',
	
	columns : [
		{ 
			header : T('label.id'), 
			dataIndex : 'id',
			width : 45,
			hidden : true 
		},
		{ 
			header : T('label.code'), 
			dataIndex : 'name', 
			width : 120, 
			editor : { 
				xtype : 'textfield', 
				allowBlank : false,
				maxLength : 60
			} 
		},
		{ 
			header : T('label.display'), 
			dataIndex : 'name', 
			width : 120, 
			renderer : function(val) {
				return T('menu.' + val);
			} 
		},
		{ 
			header : T('label.description'), 
			width : 150, 
			dataIndex : 'description', 
			editor : { 
				xtype : 'textfield', 
				maxLength : 255 
			} 
		},
		{ 
			header : T('label.category'), 
			dataIndex : 'category', 
			editor : { 
				xtype : 'codecombo', 
				commonCode : 'MENU_CATEGORY',
				allowBlank : false
			} 
		},
		{ 
			header : T('label.type'), 
			dataIndex : 'menu_type', 
			width : 65, 
			editor : { 
				xtype : 'codecombo', 
				commonCode : 'MENU_TYPE',
				allowBlank : false
			} 
		},
		{ 
			header : T('label.rank'), 
			dataIndex : 'rank', 
			xtype : 'numbercolumn', 
			format : T('format.number'), 
			width : 60, 
			align : 'right',
			editor : { 
				xtype : 'numberfield',
				minValue : 0
			}			
		},
		{ 
			header : T('label.hidden_flag'), 
			dataIndex : 'hidden_flag', 
			xtype : 'checkcolumn', 
			width : 60 
		},
		{ 
			header : T('label.updater'), 
			dataIndex : 'updater', 
			xtype : 'entitycolumn' 
		},
		{ 
			header : T('label.updated_at'), 
			width : 120, 
			dataIndex : 'updated_at', 
			xtype : 'datecolumn', 
			format : T('format.datetime') 
		}
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ 
				fieldLabel : T('label.code'), 
				name : 'name-like' 
			},
			{ 
				fieldLabel : T('label.description'), 
				name : 'description-like' 
			}
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'delete']
	} ]

});