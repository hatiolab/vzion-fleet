Ext.define('Base.view.favorite.Favorite', {
	extend: 'Ext.form.Panel',

	xtype: 'base_favorite',

	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	title: T('button.favorite'),
	
	layout : 'card',
	cls : 'favorite',

	dockedItems: {
		xtype: 'controlbar',
		items: ['->']
	},

	items: [{
		xtype: 'container',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'grid',
			itemId : 'grid_favorite',
			flex: 1,
			store: 'Favorite',
			plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit : 1
			}) ],
			dockedItems : {
				xtype : 'toolbar',
				items : [ {
					xtype : 'label',
					text : T('button.favorite')
				}, '->', {
					itemId : 'movedown',
					cls : 'movedown'
				}, {
					itemId : 'moveup',
					cls : 'moveup'
				}]
			},
			multiSelect: true,
			sortableColumns: false,
			enableColumnHide: false,
			enableColumnMove: false,
			selModel: {
				selType : 'checkboxmodel',
				headerWidth : 30
			},
			columns: [{
					dataIndex: 'id',
					hidden: true
				}, {
					dataIndex: 'domain_id',
					hidden: true
				}, {
					header: T('label.name'),
					dataIndex: 'name',
					flex : 1
				}, {
					header: T('label.description'),
					dataIndex: 'description',
					flex : 2,
					editor: {
						xtype: 'textfield'
					}
				}, {
					dataIndex: 'template',
					hidden: true
				}, {
					header: T('label.alias'),
					dataIndex: 'alias',
					flex : 2,
					editor: {
						xtype: 'textfield'
					}
				}]
			},
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'middle'
				},
				items: {
					xtype : 'container',
					layout : {
						type : 'vbox',
						align : 'middle'
					},
					defaults : {
						margin : '2 7'
					},
					items : [{
						xtype: 'button',
						itemId : 'add',
						cls : 'moveleft'
					}, {
						xtype: 'button',
						itemId : 'delete',
						cls : 'moveright'
					}]
				}
			},
			{
				xtype: 'grid',
				itemId : 'grid_menu',
				flex: 1,
				store: 'Menu',
				multiSelect: true,
				sortableColumns: false,
				enableColumnHide: false,
				enableColumnMove: false,
				dockedItems : {
					xtype : 'toolbar',
					items : [ {
						xtype : 'label',
						text : T('label.menu')
					} ]
				},
				selModel: {
					selType : 'checkboxmodel',
					headerWidth : 30
				},
				columns: [{
					dataIndex: 'id',
					hidden: true
				}, {
					dataIndex: 'domain_id',
					hidden: true
				}, {
					header: T('label.name'),
					dataIndex: 'name',
					flex : 1
				}, {
					header: T('label.description'),
					dataIndex: 'description',
					flex : 2
				}, {
					dataIndex: 'template',
					hidden: true
				}]
			}]
		}],

	initComponent: function() {
		this.callParent();
	}
});
