Ext.define('Base.view.report.Report', {

	extend: 'Frx.common.ListView',

	xtype: 'base_report',

	title: T('menu.Report'),

	store: 'Base.store.Report',

	columns: [{
		xtype: 'actioncolumn',
		icon: 'assets/std/iconSlideshow.png',
		itemId: 'slideshow',
		width: 30,
		align: 'center'
	}, {
		header: T('label.id'),
		dataIndex: 'id',
		hidden: true
	}, {
		header: T('label.name'),
		dataIndex: 'name',
		width : 150,
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.template'),
		dataIndex: 'template_url',
		flex : 1
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

	dockedItems: [{
		xtype: 'searchform',
		items: [{
			fieldLabel: T('label.name'),
			name: 'name-like'
		}]
	}, {
		xtype: 'controlbar',
		items: ['->', 'add', 'save', 'delete']
	}]
});
