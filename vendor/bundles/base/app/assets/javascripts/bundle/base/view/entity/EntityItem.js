Ext.define('Base.view.entity.EntityItem', {

	extend : 'Ext.tab.Panel',
	
 	requires : [ 
		'Base.view.entity.EntityForm',
		'Base.view.entity.EntityColumnList'
	],

	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	xtype : 'base_entity_item',

	title: T('menu.Entity'),

	items : [ {
		xtype : 'base_entity_form'
	}, {
		xtype : 'base_entity_column_list'
	} ],

	setRecord : function(record) {
		this.record = record;
		HF.setTitle(T('title.entity') + ' ' + this.record.get('name'));
		this.down('form').loadRecord(this.record);
	},

	getRecord : function() {
		return this.record;
	}
});