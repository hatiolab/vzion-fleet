Ext.define('Base.view.domain.Domain', {

	extend: 'Frx.common.ListView',

	xtype: 'base_domain',

	title: T('menu.Domain'),

	store: 'Base.store.Domain',

	columns: [ {
		xtype : 'actioncolumn',
		icon : 'assets/std/iconSlideshow.png',
		itemId : 'slideshow',
		width : 30,
		align : 'center'
	}, {
		header : T('label.id'),
		dataIndex : 'id',
		hidden : true
	}, {
		header : T('label.name'),
		dataIndex : 'name',
		width : 150
	}, {
		header : T('label.description'),
		dataIndex : 'description',
		flex : 1,
		editor : {
			xtype : 'textfield',
			maxLength : 250
		}
	}, {
		header : T('label.timezone'),
		dataIndex : 'timezone',
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
		header : T('label.system_flag'),
		dataIndex : 'system_flag',
		xtype : 'checkcolumn',
		width : 100
	}, {
		header : T('label.subdomain'),
		dataIndex : 'subdomain',
		width : 150,
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	} ],

	dockedItems: [ {
		xtype: 'searchform',
		items: [ {
			fieldLabel: T('label.name'),
			name: 'name-like'
		}, {
			fieldLabel: T('label.description'),
			name: 'description-like'
		} ]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});
