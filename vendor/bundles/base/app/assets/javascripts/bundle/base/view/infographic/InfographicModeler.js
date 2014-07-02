Ext.define('Base.view.infographic.InfographicModeler', {
	extend : 'Ext.form.Panel',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_infographic_modeler',
	
	cls : 'infographic_modeler',
	
	layout : 'border',
	
	title : T('title.modeler'),
	
	items : [{
		xtype : 'hidden',
		name : 'diagram'
	}, {
		xtype : 'component',
		itemId : 'modeler',
		region : 'center',
		autoScroll : true
	}],
	
	dockedItems: [ {
		xtype : 'toolbar',
		dock : 'top',
		items : [ {
			itemId : 'redo',
			cls : 'redo',
			tooltip : T('tooltip.redo')
		}, {
			itemId : 'undo',
			cls : 'undo',
			tooltip : T('tooltip.undo')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'cut',
			cls : 'cut',
			tooltip : T('tooltip.cut')
		}, {
			itemId : 'copy',
			cls : 'copy',
			tooltip : T('tooltip.copy')
		}, {
			itemId : 'paste',
			cls : 'paste',
			tooltip : T('tooltip.paste')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'align_top',
			cls : 'align_top',
			tooltip : T('tooltip.align_top')
		}, {
			itemId : 'align_vcenter',
			cls : 'align_vcenter',
			tooltip : T('tooltip.align_vcenter')
		}, {
			itemId : 'align_bottom',
			cls : 'align_bottom',
			tooltip : T('tooltip.align_bottom')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'align_left',
			cls : 'align_left',
			tooltip : T('tooltip.align_left')
		}, {
			itemId : 'align_hcenter',
			cls : 'align_hcenter',
			tooltip : T('tooltip.align_hcenter')
		}, {
			itemId : 'align_right',
			cls : 'align_right',
			tooltip : T('tooltip.align_right')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'arrange_front',
			cls : 'arrange_front',
			tooltip : T('tooltip.arrange_front')
		}, {
			itemId : 'arrange_back',
			cls : 'arrange_back',
			tooltip : T('tooltip.arrange_back')
		}, {
			itemId : 'arrange_forward',
			cls : 'arrange_forward',
			tooltip : T('tooltip.arrange_forward')
		}, {
			itemId : 'arrange_backward',
			cls : 'arrange_backward',
			tooltip : T('tooltip.arrange_backward')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'scale_reduce',
			cls : 'scale_reduce',
			tooltip : T('tooltip.scale_reduce')
		}, {
			itemId : 'scale_enlarge',
			cls : 'scale_enlarge',
			tooltip : T('tooltip.scale_enlarge')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'text_align_left',
			cls : 'text_left',
			tooltip : T('tooltip.text_align_left')
		}, {
			itemId : 'text_align_center',
			cls : 'text_center',
			tooltip : T('tooltip.text_align_center')
		}, {
			itemId : 'text_align_right',
			cls : 'text_right',
			tooltip : T('tooltip.text_align_right')
		},
		{ xtype: 'tbseparator' },
		{
			itemId : 'text_bold',
			cls : 'text_bold',
			tooltip : T('tooltip.text_bold')
		}, {
			itemId : 'text_italic',
			cls : 'text_italic',
			tooltip : T('tooltip.text_italic')
		}, {
			itemId : 'text_underline',
			cls : 'text_underline',
			tooltip : T('tooltip.text_underline')
		}, {
			itemId : 'text_strikethrough',
			cls : 'text_strikethrough',
			tooltip : T('tooltip.text_strikethrough')
		}, {
			itemId : 'text_reduce',
			cls : 'text_reduce',
			tooltip : T('tooltip.text_reduce')
		}, {
			itemId : 'text_enlarge',
			cls : 'text_enlarge',
			tooltip : T('tooltip.text_enlarge')
		}, '->', {
			xtype : 'label',
			itemId : 'modified',
			cls : 'labelModified',
			tooltip : T('tooltip.modified')
		}, {
			itemId : 'reload',
			cls : 'reload',
			tooltip : T('tooltip.reload')
		} ]
	}, {
		xtype : 'container',
		itemId : 'pallet',
		dock : 'left',
		width : 36,
		defaults : {
			xtype : 'button',
			width : 30,
			editmode : Delo.EDITMODE.CREATE
		},
		items : [ {
			cls : 'move',
			itemId : 'move',
			editmode : Delo.EDITMODE.SELECT,
			pressed : true,
			tooltip : T('tooltip.select')
		}, {
			cls : 'hand',
			itemId : 'hand',
			editmode : Delo.EDITMODE.PANE,
			tooltip : T('tooltip.pane')
		}, {
			cls : 'barcode',
			itemId : 'barcode',
			model : 'Barcode',
			tooltip : T('tooltip.barcode')
		}, {
			cls : 'line',
			itemId : 'line',
			model : 'Delo.Line',
			tooltip : T('tooltip.line')
		}, {
			cls : 'rectangle',
			itemId : 'box',
			model : 'Delo.Box',
			tooltip : T('tooltip.box')
		}, {
			cls : 'ellipse',
			itemId : 'ellipse',
			model : 'Delo.Ellipse',
			tooltip : T('tooltip.ellipse')
		}, {
			cls : 'text',
			itemId : 'text',
			model : 'Delo.Text',
			tooltip : T('tooltip.text')
		}, {
			cls : 'image',
			itemId : 'image',
			model : 'Delo.Image',
			tooltip : T('tooltip.image')
		}, {
			cls : 'grf',
			itemId : 'grf',
			model : 'Delo.Grf',
			tooltip : T('tooltip.grf')
		} ]
	}, {
		xtype : 'panel',
		dock : 'right',
		width : 230,
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [ {
			xtype : 'textfield',
			itemId : 'propsearch',
			cls : 'propsearch'
		}, {
			xtype : 'propertygrid',
			flex : 1,
			sourceConfig: {
		        symbol : {
		            editor: Ext.create('Ext.form.ComboBox', {
						// name : 'symbol',
						allowBlank : false,
						store : 'Base.store.BarcodeSymbol',
						typeAhead : true,
						queryMode : 'local',
						triggerAction : 'all',
						emptyText : '-- Select Symbol --',
						selectOnFocus : true,
						// displayField : 'desc',
						displayField : 'sym',
						valueField : 'sym'
					}),
		            displayName: 'Barcode Symbol'
		        },
				rotation : {
					editor : Ext.create('Ext.form.ComboBox', {
						// name : 'rotation',
						allowBlank : false,
						store : [['N', 'Normal - 0'], ['R', 'Right - 90'], ['I', 'Inverse - 180'], ['L', 'Left - 270']],
						emptyText : '-- Select Rotation --',
						selectOnFocus : true
					})
				},
				fill : {
					editor : Ext.create('Frx.field.ColorField', {
						value : 'FFFFFF',
						fieldLabel : ''
					})
				},
				stroke : {
					editor : Ext.create('Frx.field.ColorField', {
						value : '000000',
						fieldLabel : ''
					})
				},
				fontFamily : {
					editor : Ext.create('Ext.form.ComboBox', {
						allowBlank : false,
						store : ['verdana', 'arial', 'tahoma', 'times'],
						emptyText : '-- Select Font Family --',
						selectOnFocus : true
					})
				}
		    }
		} ]
	}, {
		xtype: 'controlbar',
		items: ['print', '->', 'list', 'save', 'delete']
	} ]
});
