Ext.define('Base.view.user.UserListPopup', {

	extend: 'Frx.common.Popup',

	xtype: 'base_user_list_popup',

	title: T('title.user'),
	
	height : 600,
	
	width : 750,
	
	userStore : Ext.create('Base.store.User'),
	
	createView : function(view) {
		return {
			xtype : 'container',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [ this.createFormPart(this), this.createGridPart(this) ]
		};
	},
	
	createFormPart: function(view) {
		return {
			xtype: 'form',
			layout: {
				type : 'vbox',
				align : 'stretch',
				bodyPadding: '5 5 5 5',
			},
			items : [ {
				xtype: 'container',
				layout : {
					type : 'hbox',
					align : 'stretch',
					anchor : '90%'
				},
			    items: [ {
					name : 'login-like',
					fieldLabel : T('label.login'),
					xtype : 'textfield',
					flex : 1,
					margin : '5 5 5 5',
				}, {
					name : 'name-like',
					fieldLabel : T('label.name'),
					xtype : 'textfield',
					flex : 1,
					margin : '5 5 5 5',
				} ]
			}, {
				xtype: 'container',
				layout : {
					type : 'hbox',
					align : 'stretch',
					anchor : '90%'
				},
			    items: [ { 
					name : 'admin_flag-eq',
					fieldLabel : T('label.admin'),
					xtype : 'checkbox',
					inputValue : true,
					flex : 1,
					margin : '5 5 5 5'
				}, {
					name : 'operator_flag-eq',
					fieldLabel : T('label.operator_flag'),
					xtype : 'checkbox',
					inputValue : true,
					flex : 1,
					margin : '5 5 5 5'
				} ]
			} ]			
		}
	},
	
	createGridPart : function(self) {
		return {
			xtype : 'grid',
			
			flex : 1,

			store : self.userStore,

			verticalScroller : { variableRowHeight: true },

			selModel : Ext.create('Ext.selection.CheckboxModel'),

			columns : [ { 
				dataIndex : 'id',
				text : T('label.id'),
				hidden : true
			}, {
				dataIndex : 'login',
				text : T('label.login'),
				width : 100
			}, {
				dataIndex : 'name',
				text : T('label.user_name'),
				flex : 1
			}, {
				dataIndex : 'email',
				text : T('label.email'),
				flex : 1.2
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'admin_flag',
				text : T('label.admin'),
				width : 80
			}, {
				xtype : 'checkcolumn',
				dataIndex : 'operator_flag',
				text : T('label.operator_flag'),
				width : 80
			} ],

			bbar : {
				xtype : 'pagingtoolbar',
				cls : 'pagingToolbar',
				store : this.userStore,
		        displayInfo: true,
		        displayMsg: T('text.Paging Toolbar Display Message'),
		        emptyMsg: T('text.Paging Toolbar Empty Message'),
				hidden : false
			}
		};
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'search', 'select', 'close']
	} ],
	
	initComponent : function() {
		this.items = [ this.createView(this) ];
		this.callParent();
		var pagingtoolbar = this.down(' pagingtoolbar');
		pagingtoolbar.bindStore(this.userStore);
		this.userStore.on('load', function(store) {
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	}
});
