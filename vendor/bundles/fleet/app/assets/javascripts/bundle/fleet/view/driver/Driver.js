Ext.define('Fleet.view.driver.Driver', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_driver',
	
	title : T('menu.Driver'),
	
	store : 'Fleet.store.Driver',
	
	columns : [
		{
			xtype: 'actioncolumn',
			icon: 'assets/std/iconSlideshow.png',
			itemId: 'slideshow',
			width: 30,
			align: 'center'
		}, 
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.id'), dataIndex : 'name' , editor : { xtype : 'textfield' } },
		{ header : T('label.name'), dataIndex : 'description' , editor : { xtype : 'textfield' } },
		{ header : T('label.social_id'), dataIndex : 'social_id' , editor : { xtype : 'textfield' }, width : 135 },
		{ header : T('label.division'), dataIndex : 'division' , editor : { xtype : 'textfield' } },
		{ header : T('label.title'), dataIndex : 'title' , editor : { xtype : 'textfield' }, width : 80 },
		{ header : T('label.phone'), dataIndex : 'phone_no' , editor : { xtype : 'textfield' }, width : 120 },
		{ header : T('label.mobile'), dataIndex : 'mobile_no' , editor : { xtype : 'textfield' }, width : 120 },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 }
	],
	
	dockedItems : [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.id'), name : 'name-like' },
			{ fieldLabel : T('label.name'), name : 'description-like' },
			{ fieldLabel : T('label.social_id'), name : 'social_id-like' },
			{ fieldLabel : T('label.division'), name : 'division-like' }
		]
	}, {
		xtype : 'controlbar',
		items : ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});