/**
 * DiyReportItem controller
 */
Ext.define('Base.controller.diy_report.DiyReportItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle',
		'Frx.mixin.lifecycle.PopupLifeCycle'
	],
	
	requires : [ 
		'Base.model.DiyReport', 
		'Base.model.ServiceInParam', 
		'Base.model.ServiceOutParam', 		
		'Base.store.DiyReport', 
		'Base.view.diy_report.DiyReportItem',
		'Base.view.diy_report.ViewGeneratorPopup'
	],
	
	models : ['Base.model.DiyReport', 'Base.model.ServiceInParam', 'Base.model.ServiceOutParam'],
			
	stores: ['Base.store.DiyReport'],
	
	views : ['Base.view.diy_report.DiyReportItem'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_diy_report_item' : this.EntryPoint(),
			'base_diy_report_form' : this.FormEventHandler({
				click_generate_view : this.onFormViewGen
			}),
			'base_diy_report_in_params' : this.ListEventHandler({
				//after_load_item : this.onAfterLoadItemElse,
			}),
			'base_diy_report_out_params' : this.ListEventHandler({
				//after_load_item : this.onAfterLoadItemElse,
			}),
			'base_diy_report_test' : {
				click_invoke : this.onInvokeClick
			},
			'base_report_view_generator_popup' : this.PopupEventHandler({
				click_generate :  this.onPopupGenerate
			})
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	/**
	 * generate view button click
	 */	
	onFormViewGen : function(form) {
		HF.popup('Base.view.diy_report.ViewGeneratorPopup', { id : this.selectedRecord.get('id') }, {});
	},
	
	/**
	 * popup close button click시 
	 */
	onPopupClose : function(view) {
		view.close();
	},

	/**
	 * popup 호출시 
	 */
	onPopupParamsChange : function(view, params) {
		if(params.id) {
			Base.model.DiyReport.load(params.id, {
				success : function(record, operation) {
					view.setRecord(record);
				}
			});
		}
	},

	/**
	 * generate view button click 시 
	 */	
	onPopupGenerate : function(popup) {
		var record = popup.getRecord();
		var url = 'diy_reports/' + record.get('id') + '/generate_views.json';
		var formView = popup.child('form');
		formView.getForm().submit({
		    clientValidation : true,
		    url : url,
			timeout : 20000,
		    success: function(form, action) {
				var result = action.result;
				var message = result.msg;
				self.showPopupResult(T('title.' + (result.result ? 'success' : 'failure')), message);
		    }
		});
	},
	
	/**
	 * 결과 창 표시
	 */
	showPopupResult : function(title, result) {
		Ext.create('Ext.window.Window', {
		    title: title,
		    height: 400,
		    width: 800,
			autoScroll : true,
		    layout: 'fit',
		    items: {
		        xtype: 'panel',
		        border: false,
		        defaults : { xtype : 'textarea', anchor : '100%' },
		        layout : 'fit',
		        items : [{
		            name : 'test',
		            value : result
		        }]
		    }
		}).show();
	},
	
	/**
	 * Invoke 버튼 클릭 시 
     * @testView
	 */
	onInvokeClick : function(testView) {
		var self = this;
		var testParamsForm = testView.child('form');
		var paramsStr = testParamsForm.getValues(true);
    	Ext.Ajax.request({
		    url: self.selectedRecord.get('service_url'),
		    method : 'GET',
		    params : paramsStr,
		    success : function(response) {
		        var res = Ext.JSON.decode(response.responseText);
				var testView = self.queryItem(null, 'base_diy_report_test');
				testView.showResult(self.selectedRecord.get('service_out_params'), res);
			}
		});
	},
	
});