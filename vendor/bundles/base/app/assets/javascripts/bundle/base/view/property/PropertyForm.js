Ext.define('Base.view.property.PropertyForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'base_property_form',
		
	title : T('title.properties'),

	mixins : {
		form_life_cycle : 'Frx.mixin.lifecycle.FormLifeCycle'
	},

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items: [
		{
			xtype : 'propertygrid',
			nameField : 'name',
			valueField : 'value',
			flex : 1
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'save']
	} ],
	
	initComponent : function() {
		this.callParent();
		
		this.on(this.FormEventHandler());
	},
		
	getItemRecord : function(view) {
		var record = this.mixins.form_life_cycle.getItemRecord(view);
		
		var grid = this.down('propertygrid');
		var attrs = record.get('properties_attributes');
		Ext.Object.each(grid.getSource(), function(k, v) {
			var a = Ext.Array.findBy(attrs, function(attr) {
				return attr.name === k;
			});
			
			if(a) {
				a.value = v;
			} else {
				attrs.push({
					name : k,
					value : v
				});
			}
		});
		
		return record;
	},
	
	onAfterLoadItem : function(view, record, operation) {
		this.mixins.form_life_cycle.onAfterLoadItem(view, record, operation);
		
		var grid = this.down('propertygrid');
		var props = this.getRecord().get('properties_attributes');
		
		var source = {};
		Ext.Array.each(props, function(prop) {
			source[prop.name] = prop.value
		});
		
		grid.setSource(source);
	}
});