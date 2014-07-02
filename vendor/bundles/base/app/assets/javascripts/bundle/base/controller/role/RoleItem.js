/**
 * RoleDetail controller
 */
Ext.define('Base.controller.role.RoleItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Base.model.Role', 
		'Base.store.Role', 
		'Base.store.User',
		'Base.view.role.RoleItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.Role'],
	
	stores: ['Base.store.Role'],
	
	views : ['Base.view.role.RoleItem'],
	
	refs : [ {
		ref : 'ItemView', selector : 'base_role_item'
	} ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_role_item' : this.EntryPoint(),
			'base_role_form' : this.FormEventHandler(),
			'base_role_user' : {
				click_list : this.onClickList,
				click_add : this.showUsersPopup,
				click_delete : this.deleteRoleUsers,
				add_role_users : this.addRoleUsers,
				after_load_item : this.loadRoleUsers
			},
			'base_role_permissions' : {
				click_list : this.onClickList,
				click_save : this.onRolePmssSave,
				after_load_item : this.loadRolePermissions
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 					**
	 ****************************************************************/
	/**
	 * 현재 로드된 Role 아이디를 반환 
	 */
	getRoleId : function() {
		return this.getItemView().getParams().id;
	},
	
	/**
	 * Load role permissions
	 */
	loadRolePermissions : function(view) {
		Ext.Ajax.request({
			url: 'roles/' + this.getRoleId() + '/permitted_resources.json?resource_type=Menu',
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				var permissions = [];
				Ext.Array.each(res.items, function(item) {
					var pmss = this.findPermission(permissions, item);
					if(!pmss) {
						pmss = item;
						permissions.push(pmss);
					}
					if(item.action_name && item.action_name != '') {
						pmss[item.action_name] = true;
					}
				}, this);
				view.renderPermissions(this.getRoleId(), permissions);
			},
			scope : this
		});
	},
	
	/**
	 * permission 찾기
	 */
	findPermission : function(permissions, pmss) {
		var foundPmss = null;
		Ext.Array.each(permissions, function(permission) {
			if(permission.id == pmss.id) {
				foundPmss = permission;
				return true;
			}
		});
		return foundPmss;
	},
	
	/**
	 * role permission save
	 */
	onRolePmssSave : function(view) {
		// master menu
		var treestore = view.store;
		var rootNode = treestore.getRootNode();
		var masterNodes = rootNode.childNodes;
		
		var jsonData = {'permissions' : {'Menu' : {}}};
		Ext.Array.each(masterNodes, function(masterNode) {
			jsonData['permissions']['Menu'][masterNode.data.id] = { 'show' : masterNode.data.show };
		});
		
		// child menu
		var store = view.store;
		var models = store.getModifiedRecords();
		Ext.Array.each(models, function(model) {
			if(model.data.show || model.data.create || model.data.update || model.data.delete) {
				jsonData['permissions']['Menu'][model.data.id] = { 'show' : model.data.show, 'create' : model.data.create, 'update' : model.data.update, 'delete' : model.data.delete };
			}
		});

	    Ext.Ajax.request({
		    url: 'roles/' + this.getRoleId() + '/update_permissions.json',
		    method : 'POST',
		    params : { 'role' : Ext.JSON.encode(jsonData) },
		    success : function(response) {
				this.loadRolePermissions(view);
				HF.success(T('text.Success to Save'));
			},
			scope : this
		});
	},
	
	/**
	 * Load Role Users
	 */
	loadRoleUsers : function(view) {
		Ext.Ajax.request({
			url: 'roles/' + this.getRoleId() + '/role_users.json',
			method : 'GET',
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				view.store.loadRawData(res);
			},
			scope : this
		});
	},
	
	/**
	 * role - user : add user click
	 */
	showUsersPopup : function(view) {
		HF.popup('Base.view.user.UserListPopup',{by:view}, {});
	},
	
	/**
	 * role - user : delete user click
	 */
	deleteRoleUsers : function(view) {
		var self = this;
		HF.msg.confirm({
			title : T('title.confirm'), 
			msg : T('text.Sure to Delete'), 
			fn : function(confirmBtn) {
				if(confirmBtn = 'yes') {
					var selections = view.getSelectionModel().getSelection();
					var records = [];
					Ext.Array.each(selections, function(selection) {
						selection.set('_cud_flag_', 'd');
						records.push(selection.data);
					});

					self.updateRoleUsers(view, 'd', records);
				}
			}
		});
	},
	
	/**
	 * role - user : add user click
	 */
	addRoleUsers : function(view, selections) {
		var records = [];
		Ext.Array.each(selections, function(selection) {
			selection.set('_cud_flag_', 'c');
			records.push(selection.data);
		});
		
		this.updateRoleUsers(view, 'c', records);
	},
	
	/**
	 * Update Role Users
	 */
	updateRoleUsers : function(view, cudType, records) {
		Ext.Ajax.request({
			url : 'roles/' + this.getRoleId() + '/update_users.json',
			method : 'POST',
			params : { 'role' : Ext.JSON.encode(records) },
			success : function(response) {
				this.loadRoleUsers(view);
			},
			scope : this
		});
	}
});