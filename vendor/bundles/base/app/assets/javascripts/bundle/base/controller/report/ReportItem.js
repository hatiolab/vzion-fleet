/**
 * ReportDetail controller
 */
Ext.define('Base.controller.report.ReportItem', {
	
	extend: 'Frx.controller.ItemController',
	
	requires : [ 
		'Base.model.Report', 
		'Base.store.Report', 
		'Base.view.report.ReportItem'
	],
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	models : ['Base.model.Report'],
			
	stores: ['Base.store.Report'],
	
	views : ['Base.view.report.ReportItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_report_item' : this.EntryPoint(),
			'base_report_form' : this.FormEventHandler(),
			'base_report_preview' : this.FormEventHandler({
				after_save_item : this.onAfterSaveItemForPreview,
				// after_load_item : this.onAfterLoadItemForPreview,
				click_preview :  this.onClickPreview
			})
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	onAfterLoadItemForPreview : function(form, data) {
		form.setValues(data.getData());
	},
	
	onClickPreview : function(form) {
		var birtviewer = form.down('birtviewer');
		
		birtviewer.report = location.protocol + '//' + location.host + form.getValues().template_url;

		birtviewer.refresh();
	},
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * save item data modified on the view
	 * 
	 * @view
	 */
	saveItem : function(form) {
		HF.msg.confirm({
			msg : T('text.Sure to Save'),
			fn : function(btn) {
				if(btn != 'yes')
					return;
					
				var record = this.getItemRecord(form);

				
				var errors = record.validate();
				
				if(errors.isValid()) {
					form.submit({
						url : 'reports/' + record.get('id'),
						params : {
							'_method' : 'PUT'
						},
						success : function(baseform, action) {
							// 저장을 성공하면, 그 결과로 변경된 데이타를 다시 넘겨주기로 약정한다.
							// TODO Confirm 아래 로직. 효율적인 처리 검토.
							// var savedRecord = operation.resultSet.records[0];
							form.fireEvent('after_save_item', form, Ext.create('Base.model.Report', action.result));
						}
					});
				} else {
					var errorText = T('text.Data Validation check', {x : errors.length}) + "\n";
				
					HF.error(errorText);
				}
			},
			scope: this
		});
	}
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	****************************************************************/

});