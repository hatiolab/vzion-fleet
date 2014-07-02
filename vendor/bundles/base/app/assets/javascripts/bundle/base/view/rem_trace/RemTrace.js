Ext.define('Base.view.rem_trace.RemTrace', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'base_rem_trace',
	
	title : T('menu.RemTrace'),
	
	store : 'Base.store.RemTrace',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.name'), dataIndex : 'name', width : 100 },
		{ header : T('label.x_id', {x : T('label.entity')}), dataIndex : 'entity_id', width : 75 },
		{ header : T('label.x_type', {x : T('label.entity')}), dataIndex : 'entity_type' },
		{ header : T('label.data'), dataIndex : 'content', width : 500 },
		{ header : T('label.creator'), dataIndex : 'creator', xtype : 'entitycolumn' },
		{ header : T('label.created_at'), dataIndex : 'created_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ 
				fieldLabel : T('label.x_type', {x : T('label.entity')}), 
				name : 'entity_type-eq',
				xtype : 'entitysearchcombo',
				storeClass : 'Base.store.Entity',
				valueField : 'name'
			},
			{ fieldLabel : T('label.name'), name : 'name-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'export', 'delete']
	} ]
});