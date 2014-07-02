Ext.define('Base.controller.infographic.InfographicItem', {
	
	extend: 'Frx.controller.ItemController',
	
	mixins : [
		'Frx.mixin.lifecycle.FormLifeCycle'
	],
	
	requires : [ 
		'Base.model.Infographic', 
		'Base.store.Infographic', 
		'Base.view.infographic.InfographicItem'
	],
	
	models : ['Base.model.Infographic'],
			
	stores: ['Base.store.Infographic'],
	
	views : ['Base.view.infographic.InfographicItem'],
	
	refs : [{
		selector : 'base_infographic_modeler',
		ref : 'modeler'
	}, {
		selector : 'base_infographic_modeler propertygrid',
		ref : 'property'
	}, {
		selector : 'base_infographic_modeler #pallet',
		ref : 'pallet'
	}, {
		selector : 'base_infographic_modeler #propsearch',
		ref : 'propSearch'
	}, {
		selector : 'base_infographic_modeler hidden[name=diagram]',
		ref : 'diagram'
	}],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_infographic_item' : this.EntryPointWith(
				this.FormEventHandler()
			),
			'base_infographic_form' : this.FormEventHandler(),
			'base_infographic_modeler' : this.FormEventHandler({
				after_load_item : this.onAfterLoadItemForModeler,
				after_save_item : this.onAfterSaveItemForModeler,
				show : this.onShowModeler,
				click_save :  this.onModelerClickSave,
				click_print : this.onModelerClickPrint
			}),
			'base_infographic_modeler propertygrid' : {
				beforepropertychange : this.onBeforePropertyChange
			},
			'base_infographic_modeler #propsearch' : {
				change : this.onPropSearchChanged
			},
			'base_infographic_modeler #pallet button' : {
				click : this.onPalletsBtnClick
			},
			'base_infographic_modeler toolbar button' : {
				click : this.onToolbarBtnClick
			}
		});
	},
	
	onModelerClickSave : function(view) {
		this.safeEdit.ready_sync();
		this.onFormClickSave(view);
	},
	
	onAfterSaveItemForModeler : function(view) {
		this.safeEdit.complete_sync();
	},
	
	onModelerClickPrint : function(view) {
		var container = view.down('#modeler');
		HF.print(container.documentView);
	},
	
	onAfterLoadItemForModeler : function(view, record, operation) {
		this.onAfterLoadItem(view, record, operation);

		var container = view.down('#modeler');

		if(container.documentView) {
			var document = container.documentView.collection;
			
			this.safeEdit.init();
			
			this.getProperty().setSource({
				width : document.width,
				height : document.height
			});
		}
	},
	
	onShowModeler : function(view) {
		var container = view.down('#modeler');
		
		if(!container.documentView) {

			var v = new Delo.DocumentView({
				el : container.getEl(),
			    collection : new Delo.Document()
			});
			
			v.getFocusTarget().addEventListener('keydown', this.createKeydownHandler(v));
			
			v.bind('selectionchange', _.bind(function(e) {
				function onChange(e) {
					var prop = this.getProperty();

					for(var attr in e.changed) {
						prop.setProperty(attr, e.changed[attr]);
					}
				}

				if(e.selected.length > 0) {
					// TODO 멀티로 선택되었을 때, 첫번째 모델을 프로퍼티 소스로 세팅하는데, 불합리하다. 선택된 전체 모델의 공통속성을 프로퍼티 소스로 해야 하지 않을까?
					var model = e.selected[0].getAttr('model');
					
					this.getProperty().getStore().clearFilter();
					this.getProperty().setSource(model.attributes);
					this.getProperty().getStore().filter('name', this.getPropSearch().getValue());
					
					if(e.before.length > 0) {
						var oldmodel = e.before[0].getAttr('model');
						oldmodel.off('change', onChange);
					}
			
					model.on('change', onChange, this);
				} else {
					// 아무것도 선택되지 않으면, 도큐먼트뷰의 속성을 보여주도록 한다.
					this.getProperty().setSource({
						width : v.collection.width,
						height : v.collection.height
					});

					if(e.before.length > 0) {
						var oldmodel = e.before[0].getAttr('model');
						oldmodel.off('change', onChange);
					}
				}
			}, this));
		
			v.bind('editmodechange', _.bind(function(e) {
				this.getPallet().query('button').forEach(function(b) {
					b.toggle(false);
				});
				
				switch(e.afterMode) {
				case Delo.EDITMODE.SELECT :
					container.getEl().setStyle('cursor', 'default');
					this.getPallet().query('button').forEach(function(b) {
						b.toggle(b.editmode === e.afterMode);
					});
					break;
				case Delo.EDITMODE.PANE :
					container.getEl().setStyle('cursor', 'pointer');
					this.getPallet().query('button').forEach(function(b) {
						b.toggle(b.editmode === e.afterMode);
					});
					break;
				case Delo.EDITMODE.CREATE :
					container.getEl().setStyle('cursor', 'crosshair');
					this.getPallet().query('button').forEach(function(b) {
						b.toggle(b.model === e.afterContext);
					});
					break;
				}
			}, this));
		
			v.render();
		
			container.documentView = v;

			var document = v.collection;
			
			this.safeEdit = HF.createSafeEdit(this, {
			    onsave : function() {
			    	return document.serialize();
			    },
			    oninit : function(saved) {
			    	document.load(saved);
			    },
			    onreadysync : function() {
			    	this.getDiagram().setValue(document.serialize());
			    },
			    onreset : function() {
			    	document.load(this.getDiagram().getValue());
			    },
			    id : function() {
			    	return 'Infographic-Diagram-' + HF.current.view().getParams()['id'];
			    },
			    onstatechange : function(state, text) {
					view.down('#modified').setText(text);
			    }
			});
			
			document.on('change', function(e) {
				this.safeEdit.save();
			}, this);

			this.getProperty().setSource({
				width : document.width,
				height : document.height
			});
		}
	},
	
	onBeforePropertyChange : function(source, property, value, oldvalue) {
		var modeler = this.getModeler().down('#modeler').documentView;
		var selections = modeler.getSelections();
		
		if(selections.length > 0) {
			var model = modeler.getSelections()[0].getAttr('model');
			var modelval = model.get(property);
			if(typeof(modelval) === 'undefined' || modelval === value) {
				// TODO 모델의 변화를 프로퍼티창에 반영하면서, 다시 propertychange 이벤트가 발생할 수 있으므로,
				// 그 값에 의한 경우에 의한 반복을 방지한다.
				return;
			}
		
			modeler.setModelProperty(model, property, value);
		} else {
			modeler.setDocumentProperty(property, value);
		}
	},
	
	onPropSearchChanged : function(field, val) {
		var store = this.getProperty().getStore();
		store.clearFilter();
		store.filter('name', val);
	},
	
	onPalletsBtnClick : function(button, e, eOpts) {
		var container = this.getModeler().down('#modeler');

		var modeler = container.documentView;
		
		if(typeof(button.editmode) !== 'undefined') {
			modeler.setEditMode(button.editmode, button.model);
		} else {
			modeler.setEditMode(Delo.EDITMODE.CREATE, button.model);
		}
	},

	createKeydownHandler : function(modeler) {
		return function(e) {
			switch(e.keyCode) {
			case 37 : // Left Arrow key
				modeler.movedelta({
					x : -1
				});
				break;
			case 38 : // Up Arrow Key
				modeler.movedelta({
					y : -1
				});
				break;
			case 39 : // Right Arrow Key
				modeler.movedelta({
					x : 1
				});
				break;
			case 40 : // Top Arrow Key
				modeler.movedelta({
					y : 1
				});
				break;
			case 90 : // 'z' Key
				if(e.metaKey) { 
					if(e.shiftKey) { // Command + Shift + 'z'
						modeler.redo();
					} else { // Command + 'z'
						modeler.undo();
					}
				} 
				break;
			case 88 : // 'x' Key
				if(e.metaKey) {
					modeler.cut();
				}
				break;
			case 67 : // 'c' Key
				if(e.metaKey) {
					modeler.copy();
				}
				break;
			case 86 : // 'v' Key
				if(e.metaKey) {
					modeler.paste();
				}
				break;
			}
		}
	},
	
	onToolbarBtnClick : function(button, e, eOpts) {
		var modeler = this.getModeler().down('#modeler').documentView;
		
		switch (button.itemId) {
		case 'redo':
			modeler.redo();
			break;
		case 'undo':
			modeler.undo();
			break;
		case 'cut':
			modeler.cut();
			break;
		case 'copy':
			modeler.copy();
			break;
		case 'paste':
			modeler.paste();
			break;
		case 'align_top':
			modeler.alignTop();
			break;
		case 'align_bottom':
			modeler.alignBottom();
			break;
		case 'align_left':
			modeler.alignLeft();
			break;
		case 'align_right':
			modeler.alignRight();
			break;
		case 'align_vcenter':
			modeler.alignVCenter();
			break;
		case 'align_hcenter':
			modeler.alignHCenter();
			break;
		case 'arrange_front':
			modeler.arrange_front();
			break;
		case 'arrange_back':
			modeler.arrange_back();
			break;
		case 'arrange_forward':
			modeler.arrange_forward();
			break;
		case 'arrange_backward':
			modeler.arrange_backward();
			break;
		case 'scale_enlarge':
			modeler.scale_enlarge();
			break;
		case 'scale_reduce':
			modeler.scale_reduce();
			break;
		case 'reload':
			this.safeEdit.reset();
		}
	}
});
