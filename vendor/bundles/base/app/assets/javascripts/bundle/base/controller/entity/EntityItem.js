/**
 * EntityItem controller
 */
Ext.define('Base.controller.entity.EntityItem', {

	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle',
		'Frx.mixin.lifecycle.ListLifeCycle',
		'Frx.mixin.lifecycle.PopupLifeCycle'
	],

	requires : [ 
		'Base.model.Entity', 
		'Base.model.EntityColumn', 
		'Base.store.Entity', 
		'Base.view.entity.EntityItem',
		'Base.view.entity.ViewGeneratorPopup',
		'Base.view.entity.ApiGeneratorPopup',
		'Base.view.entity.ModelGeneratorPopup'
	],

	models : ['Base.model.Entity', 'Base.model.EntityColumn'],

	stores: ['Base.store.Entity'],

	views : ['Base.view.entity.EntityItem'],

	init: function() {
		this.callParent(arguments);

		this.control({
			'base_entity_item' : this.EntryPoint(),
			'base_entity_form' : this.FormEventHandler({
				click_generate_api : this.onFormApiGen,
				click_generate_model : this.onFormModelGen,
				click_generate_view : this.onFormViewGen,
				click_generate_table : this.onFormTableGen
			}),
			'base_entity_column_list' : this.ListEventHandler({
				after_load_item : this.onAfterLoadItemForColumns,
				click_locale : this.onLocaleClick,
				click_create : this.onClickCreateColumns
			}),
			'base_view_generator_popup' : this.PopupEventHandler({
				click_generate : this.onPopupGenerate
			}),
			'base_api_generator_popup' : this.PopupEventHandler({
				click_generate : this.onPopupGenerate
			}),
			'base_model_generator_popup' : this.PopupEventHandler({
				click_generate : this.onPopupGenerate
			}),
		});
	},

	/****************************************************************
	 ** 					여기는 customizing area 					**
	 ****************************************************************/
	/**
	 * Generation 가능한지 체크 
	 */
	checkGeneration : function(view) {
		if(view.getRecord().get('bundle') == 'base') {
			HF.alert(T('title.warn'), T('text.Base bundle not allowed'));
			return false;
		} else {
		 	return true;
		}
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
			Base.model.Entity.load(params.id, {
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
		var self = this;
		var urlMethodName = '';
		var popupType = popup.xtype;

		if(popupType == 'base_api_generator_popup') {
			urlMethodName = 'generate_api';
		} else if(popupType == 'base_model_generator_popup') {
			urlMethodName = 'generate_model';
		} else if(popupType == 'base_view_generator_popup') {
			urlMethodName = 'generate_views';
		}

		if(urlMethodName == '') {
			Ext.Msg.alert(T('title.warn'), T('text.Invalid data'));
			return;
		}

		var record = popup.getRecord();
		var url = 'entities/' + record.get('id') + '/' + urlMethodName + '.json';
		var formView = popup.child('form');
		formView.getForm().submit({
		    clientValidation : true,
		    url : url,
			timeout : 20000,
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				self.showPopupResult(T('title.' + (result.result ? 'success' : 'failure')), result.msg);
		    }
		});
	},

	/**
	 * multiple update url을 리턴 
	 */
	getUpdateListUrl : function(grid) {
		return 'entities/' + grid._record.get('id') + '/update_multiple_entity_columns.json';
	},

	/**
	 * create click시  
	 */
	onClickCreateColumns : function(columnsGrid) {
		var self = this;
		Ext.Msg.confirm(T('title.confirm'), T('text.Sure to Create Fields'), function(confirmBtn) {
			if(confirmBtn != 'yes') 
				return;

			var url = 'entities/' + columnsGrid._record.get('id') + '/create_entity_columns.json';
			Ext.Ajax.request({
				url: url,
				method : 'POST',
				success: function(response) {
					var res = Ext.JSON.decode(response.responseText);
					columnsGrid.store.loadRawData(res.items);
		    	}
			});
		});
	},

	/**
	 * generate view button click
	 */	
	onFormViewGen : function(form) {
		if(this.checkGeneration(form)) {
			HF.popup('Base.view.entity.ViewGeneratorPopup', { id : form.getRecord().get('id') }, {});
		}
	},

	/**
	 * generate api button click
	 */	
	onFormApiGen : function(form) {
		if(this.checkGeneration(form)) {
			HF.popup('Base.view.entity.ApiGeneratorPopup', { id : form.getRecord().get('id') }, {});
		}
	},

	/**
	 * generate table button click시 
	 */
	onFormTableGen : function(view) {
		if(this.checkGeneration(view)) {
			var self = this;
			Ext.Msg.confirm(T('title.confirm'), T('text.Sure to Generate Table'), function(confirmBtn) {
				if(confirmBtn == 'yes') {
					Ext.Ajax.request({
						url: 'entities/generate_table.json',
						method : 'POST',
						success: function(response) {
							var res = Ext.JSON.decode(response.responseText);
							self.showPopupResult(T('title.' + (res.result ? 'success' : 'failure')), res.msg);
				    	}
					});
				}
			}, this);
		}
	},

	/**
	 * generate model button click시 
	 */
	onFormModelGen : function(view) {
		HF.popup('Base.view.entity.ModelGeneratorPopup', { id : view.getRecord().get('id') }, {});
	},

	/**
	 * locale button click 시
	 */
	onLocaleClick : function(grid) {
		var selectionModel = grid.getSelectionModel();
		var model = selectionModel.getSelection();

		var arrName = [];
		for(i = 0 ; i < model.length ; i++) {
			arrName.push("'" + model[i].data.name + "'" + " : " + "'" + HF.humanize(model[i].data.name) + "'");
		}

		this.showPopupResult(T('label.locale'), arrName.join(',\n'));
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
	
	addGridRecord : function(grid, record) {
		grid.store.insert(grid.getStore().getCount(), record);
		grid.plugins[0].startEditByPosition({row: 0, column: 0});
		grid.fireEvent('after_add_record', grid, record);
	},	

	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	onAfterLoadItemForColumns : function(view, record, operation) {
		view._record = record;
		
		if(view.setRecord)
			view.setRecord(record);

		Ext.Ajax.request({
			url: 'entities/' + record.get('id') + '/entity_columns.json',
			method : 'GET',
			success: function(response) {
				var res = Ext.JSON.decode(response.responseText);
				view.store.loadRawData(res.items);
			}
		});
	},

	/**
	 * 데이터 생성을 위한 새로운 엔티티 생성 
	 */
	newRecord : function(grid) {
		return {
			id : '',
			entity_id : grid._record.get('id'),
			name : '',
			description : '',
			ref_type : '',
			ref_name : '',
			column_type : 'string',
			pk : false,
			editable : false,
			list_rank : 0,
			search_rank : 0,
			sort_rank : 0,
			reverse_sort : false,
			display_rank : (grid.getStore().getCount() + 1) * 10,
			_cud_flag_ : ''
		};
	}
});