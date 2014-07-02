Ext.define('Base.controller.user.UserPwChangePopup', {

	extend: 'Ext.app.Controller',

	models: ['Base.model.User'],

	views: ['Base.view.user.UserPwChangePopup'],

	refs: [{
		selector: 'base_user_pw_change_popup',
		ref: 'userPopup'
	}],

	init: function() {
		this.control({
			'base_user_pw_change_popup': {
				paramschange: this.onParamsChange,
				click_update: this.onClickUpdate,
				click_close : this.onClickClose
			},
			'base_usercolumn': {
				userpopup: this.onUserPopup
			},
			'base_user_pw_change_popup form': {
				validitychange: this.onValidityChange
			}
		});
	},

	onParamsChange: function(popup, params) {
		var form = popup.down('form').getForm();

		Base.model.User.load(params.id, {
			success: function(user) {
				form.setValues(user.data);
			}
		});
	},

	onUserPopup: function(column, user) {
		HF.popup('Base.view.user.UserPwChangePopup', user);
	},

	onValidityChange: function(form, valid) {
		this.getUserPopup().down('button#update').setDisabled(!valid);
	},

	onClickUpdate: function(popup) {
		var formView = popup.down('form');
		var form = formView.getForm();
		
		if(!form.isValid()) {
			Ext.Msg.alert('Check Validation');
			return;
		}
		
		var values = form.getValues();
		if (values.id) {
			// update
			var user = Ext.create('Base.model.User', values);
			user.save({
				callback: function(records, operation, success) {
					if(success) {
						popup.close();
					} else {
						popup.close();
						if(operation.error) {
							if(operation.error.status == '422') {
								HF.msg.confirm({
									msg : T('text.Success to Change Password'),
									fn : function(confirmBtn) {
										location.reload();
									}
								});
							}
						} else {
							HF.failure(T('Fail to Update'));
						}
					}
				}
			});
		}
	},
	
	onClickClose : function(popup) {
		popup.close();
	}
});
