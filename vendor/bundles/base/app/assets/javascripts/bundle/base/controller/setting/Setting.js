Ext.define('Base.controller.setting.Setting', {
	extend : 'Ext.app.Controller',

	views : ['Base.view.setting.Setting'],

	refs : [ {
		selector : 'base_setting',
		ref : 'setting'
	} ],
	
	init : function() {
		this.control({
			'base_setting' : {
				afterrender : this.onAfterRender,
				click_save : this.onClickSave,
				click_reset : this.onClickReset
			}
		});
	},
	
	onAfterRender : function () {
		this.getSetting().getForm().setValues(HF.setting.all(function(id, value) {
			return id.indexOf('setting-') === 0;
		}));
	},
	
	onClickSave : function () {
		Ext.Object.each(this.getSetting().getForm().getFieldValues(), function(name, value) {
			HF.setting.set(name, value);
		});
	},
	
	onClickReset : function () {
		this.getSetting().getForm().reset();
	}
});