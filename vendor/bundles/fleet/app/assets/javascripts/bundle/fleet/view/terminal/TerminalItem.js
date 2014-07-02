Ext.define('Fleet.view.terminal.TerminalItem', {
	
	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Fleet.view.terminal.TerminalForm'
	],
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'fleet_terminal_item',
	
	title : T('menu.Terminal'),
	
	items : [ {
		xtype : 'fleet_terminal_form'
	} ]
});