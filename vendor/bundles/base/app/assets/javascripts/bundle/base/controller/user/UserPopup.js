Ext.define('Base.controller.user.UserPopup', {

	extend: 'Ext.app.Controller',

	models: ['Base.model.User'],
	
	stores : ['Base.store.User', 'Base.store.Timezone'],

	views: ['Base.view.user.UserPopup'],

	refs: [{
		selector : 'base_user_popup',
		ref : 'userPopup'
	}, {
		selector : 'base_user',
		ref : 'userList'
	}],

	init: function() {
		this.control({
			'base_user_popup': {
				paramschange: this.onParamsChange,
				click_save: this.onClickSave,
				click_close: this.onClickClose
			},
			'base_usercolumn': {
				userpopup: this.onUserPopup
			},
			'base_user_popup form': {
				validitychange: this.onValidityChange
			}
		});
	},

	onParamsChange: function(popup, params) {
		if(params.id) {
			var formView = popup.down('form');
			Base.model.User.load(params.id, {
				success: function(user) {
					formView.getForm().setValues(user.data);
				}
			});
			formView.child('textfield[name=login]').setReadOnly(true);
		} else {
			popup.down('button#save').setDisabled(true);
		}
	},

	onUserPopup: function(column, user) {
		HF.popup('Base.view.user.UserPopup', user);
	},

	onValidityChange: function(form, valid) {
		this.getUserPopup().down('button#save').setDisabled(!valid);
	},

	onClickSave: function(popup) {
		var form = popup.down('form').getForm();
		if(!form.isValid()) {
			Ext.Msg.alert('Check Validation');
			return;
		}
		
		var values = form.getValues();

		// TODO REST Style로 변경 
		if (values.id) {
			// update
			var user = Ext.create('Base.model.User', values);
			user.save({
				success: function(record, operation) {
					var userGrid = this.getUserList();
					userGrid.fireEvent('after_update_list', userGrid, 'u', null);
					HF.success(T('text.Success to Save'));
					popup.close();
				},
				scope : this
			});
		} else {
			// create
			var user = {};
			Ext.iterate(values, function(name, value) {
				if (name != 'id') {
					user['user[' + name + ']'] = value;
				}
			});
			Ext.Ajax.request({
				url: 'create.json',
				method: 'POST',
				params: user,
				success: function(response) {
					var userGrid = this.getUserList();
					userGrid.fireEvent('after_update_list', userGrid, 'c', null);
					HF.success(T('text.Success to Create'));
					popup.close();
				},
				scope : this
			});
		}
	},
	
	onClickClose : function(view) {
		view.close();
	}
});
