Ext.define('Frx.common.PageInfoPopup', {
	extend : 'Ext.window.Window',

	xtype : 'qrlink',
	
	title : 'Page Information',
		
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	width : 500,
	height : 360,
	
	items : [ {
		xtype : 'container',
		layout : {
			type : 'vbox',
			align : 'center'
		}, 
		items : [ {
			xtype : 'image',
			itemId : 'qrcode',
			flex : 1
		} ]
	}, {
		xtype : 'textfield',
		itemId : 'link',
		fieldLabel : 'Link',
		labelAlign : 'top',
		disabled : true
	} ],
	
	dockedItems : [ {
		xtype: 'controlbar',
		items: ['->', 'print']
	} ],
	
	initComponent : function() {
		this.callParent();
		
		this.on({
			'afterrender' : function() {
				var link = this.down('textfield#link');
				link.setValue(location.href);

				var imageUrl = BWIPJS.imageUrl({
					symbol : 'qrcode',
					text : location.href,
					alttext : location.href,
					scale_h : 3,
					scale_w : 3,
					rotation : 'N'
				});
			
				var qrbox = this.down('box#qrcode');
				qrbox.setSrc(imageUrl);
			},
			'click_print' : function() {
				HF.print(this.body.dom.getElementsByTagName('canvas')[0]);
			}
		}, this);
	}
});