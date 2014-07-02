Ext.define('Base.view.common_code.AddCommonCodePopup', {

	extend: 'Frx.common.Popup',

	xtype: 'base_common_code_add_popup',

	title: T('title.add_common_code'),
	
	height : 220,
	
	width : 340,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'component',
		itemId : 'codeinfo',
		tpl : '<div class="commoncode">{name}</div><div>{description}</div>'
	}, {
		xtype : 'textfield',
		fieldLabel : T('label.code'),
		itemId : 'code'
	}, {
		xtype : 'textfield',
		fieldLabel : T('label.description'),
		itemId : 'description'
	} ],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'close']
	} ],
	
	listeners : {
		click_add : function(view) {
			console.log('add clicked')
		}
	}
});
