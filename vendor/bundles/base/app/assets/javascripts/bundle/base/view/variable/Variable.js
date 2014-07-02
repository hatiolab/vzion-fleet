Ext.define('Base.view.variable.Variable', {

	extend: 'Frx.common.ListView',

	xtype: 'base_variable',

	title: T('menu.Variable'),

	store: 'Base.store.Variable',

	columns: [{
		header: T('label.id'),
		dataIndex: 'id',
		hidden: true
	}, {
		header : T('label.name'),
		dataIndex : 'name',
		flex : 1,
		editor : {
			xtype: 'textfield'
		}
	}, {
		header: T('label.description'),
		dataIndex: 'description',
		flex : 1.5,
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.category'),
		dataIndex: 'category',
		xtype: 'codecolumn',
		commonCode: 'VARIABLE_CATEGORY',
		tpl: '{description}',
		width: 90,
		editor: {
			xtype: 'codecombo',
			commonCode: 'VARIABLE_CATEGORY'
		}
	}, {
		header: T('label.updater'),
		dataIndex: 'updater',
		xtype: 'entitycolumn'
	}, {
		header: T('label.updated_at'),
		dataIndex: 'updated_at',
		xtype: 'datecolumn',
		format: T('format.datetime'),
		width: 120
	}, {
		header: 'cud flag',
		dataIndex: '_cud_flag_',
		hidden: true,
		sortable: false,
		width: 0,
		value: ''
	}],

	dockedItems: [ {
		xtype: 'searchform',
		items: [ {
			fieldLabel: T('label.name'),
			name: 'name-like'
		}, {
			fieldLabel: T('label.description'),
			name: 'description-like'
		}, {
			fieldLabel : T('label.category'),
			name : 'category-eq',
			xtype : 'codesearchcombo',
			valueField : 'name',
			displayField : 'description',
			commonCode : 'VARIABLE_CATEGORY'
		} ]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});
