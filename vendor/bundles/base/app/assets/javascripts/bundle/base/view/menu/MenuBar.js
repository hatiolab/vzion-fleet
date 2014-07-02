Ext.define('Base.view.menu.MenuBar', {
	extend : 'Frx.common.Popup',

	xtype : 'base_menubar',

	title : T('label.menu'),

	modal : true,
	
	closeOnClickMask : true,

	closable : false,

	width : 320,

	height : 600,
	
	cls : 'menuModal',

	layout : 'fit',

	items : [ {
		xtype : 'dataview',
		autoScroll : true,
		store : 'Menu',
		
		itemSelector : 'div',
		tpl : [ '<tpl for=".">', 
		        '<tpl if="parent_id">', 
		        	'<div class="menuItem">',
		        		'<span style="background:url(assets/menu/{name}.png) 0 8px no-repeat"></span>{[T("menu." + values.name)]}', 
		        	'</div>', 
		        '</tpl>',
				'<tpl if="!parent_id">', 
					'<div class="menuGroup">',
						'{[T("menu." + values.name)]}', 
					'</div>', 
				'</tpl>', 
			'</tpl>' ]
	} ]
});