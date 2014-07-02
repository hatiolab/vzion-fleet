/**
 * <%= class_name %> controller
 */
Ext.define('<%= @bundle %>.controller.<%= singular_name %>.<%= class_name %>', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'<%= @bundle %>.model.<%= class_name %>', 
		'<%= @bundle %>.store.<%= class_name %>', 
		'<%= @bundle %>.view.<%= singular_name %>.<%= class_name %>' 
	],
	
	models : ['<%= @bundle %>.model.<%= class_name %>'],
			
	stores: ['<%= @bundle %>.store.<%= class_name %>'],
	
	views : ['<%= @bundle %>.view.<%= singular_name %>.<%= class_name %>'],
	
	refs: [ { ref : '<%= class_name %>', selector : '<%= @bundle.downcase %>_<%= singular_name %>' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'<%= @bundle.downcase %>_<%= singular_name %>' : this.EntryPoint(),
			'<%= @bundle.downcase %>_<%= singular_name %> #goto_item' : {
				click : this.onGotoItem
			}
		});
	}

});