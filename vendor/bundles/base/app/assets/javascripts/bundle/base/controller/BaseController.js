Ext.define('Base.controller.BaseController', {
	extend: 'Ext.app.Controller',

	requires: ['Base.mixin.Status', 'Base.mixin.Tracer', 'Frx.controller.ControlBar'],

	stores: ['Base.store.Tracer', 'Base.store.BarcodeSymbol'],
	models: ['Base.model.Tracer'],

	views: [
		'Frx.common.ControlBar',
		'Frx.grid.TextLinkColumn',
		'Frx.field.DateRange',
		'Frx.field.DateTimeRange',
		'Frx.field.ImportPopup',
		'Base.view.user.UserLinkColumn', 
		'Base.view.entity.EntityField',
		'Base.view.entity.EntityNameField',
		'Base.view.entity.EntityCombo',
		'Base.view.entity.EntitySearchCombo',	
		'Base.view.entity.EntityNameCombo',
		'Base.view.entity.EntityColumn',
		'Base.view.common_code.CodeField',
		'Base.view.common_code.CodeCombo',
		'Base.view.common_code.CodeColumn',
		'Base.view.common_code.CodeSearchCombo'
	],

	controllers: ['common_code.CodePicker', 'entity.EntityPicker', 'user.UserPopup'],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Base.controller.' + ctl);
		});

		this.control({
			'viewport' : {
				afterrender : this.onViewportAfterRender
			},
			'#user_profile' : {
				click : this.onUserProfile
			},
			'#user_locale' : {
				added : this.onLocaleMenuAdded
			},
			'popup' : {
				show : this.onPopupShow
			},
			'searchform field' : {
				specialkey : this.onSpecialKeySearchField
			}
		});

		/* BarcodeSymbol Store Initializing */
		if(typeof symdesc != "undefined") {
			symdesc.pop();
			symdesc.sort(function(a,b) {
				return (a.desc < b.desc ? -1 : 1);
			});
			Ext.getStore('Base.store.BarcodeSymbol').loadData(symdesc);
		}
		
		/* Loading Mixins */
		HF.mixin('Base.mixin.Status');
		HF.mixin('Base.mixin.Tracer');
		HF.mixin('Base.mixin.Code');
		HF.mixin('Base.mixin.Infographic');

		HF.custom.topbar({
			xtype : 'button',
			text : T('button.setting'),
			cls : 'sideSetting',
			handler : function() {
				HF.show('Base.view.setting.Setting');
			}
		});

		HF.custom.topbar({
			xtype : 'button',
			text : T('button.locale'),
			id : 'user_locale',
			menu : []
		});

		HF.custom.topbar({
			xtype : 'button',
			text : login.name,
			id : 'user_profile'
		});

		HF.custom.statusbar({
			xtype: 'button',
			cls : 'btnTracer',
			handler: function() {
				HF.show('Base.view.tracer.Tracer');
			}
		});
		
		HF.custom.setting({
			xtype : 'container',
			layout : 'hbox',
			items : [ {
				xtype : 'checkbox',
				fieldLabel : T('setting.setting-folding_sidebar'),
				name : 'setting-folding_sidebar'
			} ]
		});
	},
	
	onViewportAfterRender : function() {
		Ext.Array.each(HF.custom.statusbar(), function(component) {
			try {
				HF.status.tray(component);
			} catch (e) {
				HF.error(T('error.CUSTOM-STATUSBAR-FAILURE', {
					view : component
				}), e);
			}
		}, this);
	},

	onUserProfile : function() {
		HF.popup('Base.view.user.UserPwChangePopup', {
			id : login.id
		});
	},
	
	onLocaleMenuAdded : function(locale) {
		var menus = [];
		HF.code_store('LOCALE').each(function(record) {
			var locale = record.get('name');
			var text = record.get('description');
			if(locale) {
				menus.push({
					xtype : 'menucheckitem',
					text : text,
					group : 'locale',
					inputValue : locale,
					checked : (locale === Ext.util.Cookies.get('locale')),
					checkHandler : function(item, checked) {
						if(!checked)
							return;
						
						Ext.util.Cookies.set('locale', item.inputValue)

						location.reload();
					}
				});
			}
		})
		
		locale.menu.add(menus);
	},
	
	/* closeOnClickMask가 설정된 모든 base_popup은 모달 마스크가 클릭되면, 닫힌다.*/
	onPopupShow : function(win) {
		if(win.closeOnClickMask) {
			var listener = Ext.select('.x-mask').addListener('click', function() {
				Ext.select('.x-mask').removeListener(listener);
	            win.close();
	        });
		}
	},
	
	/* 모든 검색 패널의 필드에서 Enter Key 가 눌리면, 검색을 실행한다. */
	onSpecialKeySearchField : function(field, e) {
		if (e.getKey() !== e.ENTER)
		 	return;

		var searchButton = field.up('searchform').down('button#search');
		if(searchButton) {
			/* Field 의 모든 값이 변경된 이후에 실행하는 것을 보장하기 위해서 defer 를 사용한다. */
			Ext.defer(function() {
				searchButton.fireEvent('click', searchButton);
			}, 1);
		}
	}
});
