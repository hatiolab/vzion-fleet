Ext.define('Base.view.contact.Contact', {

	extend: 'Frx.common.ListView',

	xtype: 'base_contact',

	title: T('menu.Contact'),

	store: 'Base.store.Contact',

	columns: [ {
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
		width : 120
	}, {
		header: T('label.family_name'),
		dataIndex: 'family_name',
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
		header: T('label.given_name'),
		dataIndex: 'given_name',
		editor : {
			xtype : 'textfield',
			allowBlank : false
		}
	}, {
		header: T('label.company'),
		dataIndex: 'company',
		width : 120,
		editor: {
			xtype: 'textfield',
			allowBlank : false
		}
	}, {
		header: T('label.department'),
		dataIndex: 'department',
		editor: {
			xtype: 'textfield',
			allowBlank : false
		}
	}, {
		header: T('label.title'),
		dataIndex: 'title',
		width : 120,
		editor: {
			xtype: 'textfield',
			allowBlank : false
		}
	}, {
		header: T('label.phone_office'),
		dataIndex: 'phone_office',
		width : 130,
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.phone_mobile'),
		dataIndex: 'phone_mobile',
		width : 130,
		editor: {
			xtype: 'textfield'
		}
	}, {
		header: T('label.email'),
		dataIndex: 'email',
		width : 200,
		editor: {
			xtype: 'textfield'
		}
	} ],

	dockedItems: [{
		xtype: 'searchform',
		items: [{
			fieldLabel: T('label.name'),
			name: 'name-like'
		}, {
			fieldLabel: T('label.email'),
			name: 'email-like'
		}, {
			fieldLabel: T('label.company'),
			name: 'company-like'
		}, {
			fieldLabel: T('label.department'),
			name: 'department-like'
		}, {
			fieldLabel: T('label.phone_office'),
			name: 'phone_office-like'
		}, {
			fieldLabel: T('label.phone_mobile'),
			name: 'phone_mobile-like'
		}]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	}]
});
