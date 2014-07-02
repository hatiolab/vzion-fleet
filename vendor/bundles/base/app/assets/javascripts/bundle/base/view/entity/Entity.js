Ext.define('Base.view.entity.Entity', {

	extend: 'Frx.common.ListView',

	xtype: 'base_entity',

	title: T('menu.Entity'),

	store: 'Base.store.Entity',

	columns: [{
		header: T('label.id'),
		dataIndex: 'id',
		hidden: true
	}, {
		header: T('label.name'),
		dataIndex: 'name',
		flex: 1,
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.description'),
		flex: 2,
		dataIndex: 'description',
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.bundle'),
		dataIndex: 'bundle',
		editor: {
			allowBlank: false,
			xtype : 'entitynamecombo', 
			customSelectionUrl : 'Bundle'
		}
	}, {
		header: T('label.updater'),
		dataIndex: 'updater',
		xtype: 'entitycolumn'
	}, {
		header: T('label.updated_at'),
		width: 120,
		dataIndex: 'updated_at',
		xtype: 'datecolumn',
		format: T('format.datetime')
	}, {
		dataIndex: '_cud_flag_',
		hidden: true,
		value: ''
	}],

	dockedItems: [{
		xtype: 'searchform',
		items: [{
			fieldLabel: T('label.name'),
			name: 'name-like'
		}, {
			fieldLabel: T('label.description'),
			name: 'description-like'
		}, {
			xtype : 'entitysearchcombo',
			fieldLabel : T('label.bundle'),
			name : 'bundle-eq',
			customSelectionUrl : 'Bundle',
			valueField : 'name'
		}]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	}]
});
