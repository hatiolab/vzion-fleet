Ext.define('Base.controller.domain.DomainItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.Domain', 'Base.model.Shift'],
			
	stores: ['Base.store.Domain', 'Base.store.Timezone'],
	
	views : ['Base.view.domain.DomainItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_domain_item' : this.EntryPoint(),
			'base_domain_form' : this.FormEventHandler(),
			'base_domain_shift_form' : this.FormEventHandler({
				after_load_item : this.onAfterLoadItemShiftForm,
				click_save :  this.onClickSaveShiftForm
			}),
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/

	onClickSaveShiftForm : function(view) {
		var form = view.getForm();
		var shift = Ext.create('Base.model.Shift', form.getValues());
		shift.save({
			success : function(record, operation) {
				form.loadRecord(record);
				Ext.Msg.alert(T('title.success'), T('text.Success to Save'));
			}
		});
	},
	
	onAfterLoadItemShiftForm : function(view, record, operation) {
		Base.model.Shift.load(record.get('id'), {
			success : function(shift, operation) {
				view.getForm().loadRecord(shift);
			}
		});
	},
		
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	
	onParamsChange : function(view, params) {
		this.loadItem(view, {
			id : login.current_domain_id
		});
	}

});