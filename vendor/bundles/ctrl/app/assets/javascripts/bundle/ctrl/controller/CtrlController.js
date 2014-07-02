Ext.define('Ctrl.controller.CtrlController', {
	extend: 'Ext.app.Controller',

	requires: [ 'Ctrl.mixin.GridExt' ],

	stores: [],
	
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Ctrl.controller.' + ctl);
		});

		this.control({
		});
		
		if(!HF.setting.get('option-refresh_interval')) {
			HF.setting.set('option-refresh_interval', 60);
		}
		
		if(!HF.setting.get('option-auto_fit')) {
			HF.setting.set('option-auto_fit', false);
		}
		
		HF.custom.optionbar([{
			xtype : 'checkbox',
			name : 'option-auto_fit',
			fieldLabel : T('label.auto_fit'),
			labelWidth : 80,
			width : 130
		}, {
			xtype : 'combobox',
			name : 'option-refresh_interval',
			fieldLabel : T('label.refresh_interval'),
			displayField : 'name',
			valueField : 'value',
			store : Ext.create('Ext.data.Store', {
    			fields : ['name', 'value'],
    			data : [
        			{ name : "10 Sec.", value : 10 },
        			{ name : "20 Sec.", value : 20 },
        			{ name : "30 Sec.", value : 30 },
					{ name : "1 Min.", value : 60 },
					{ name : "5 Min.", value : 300 }
				]
			}),
			labelWidth : 150,
			width : 280
		}]);
		
		HF.mixin('Ctrl.mixin.GridExt');
	}
});
