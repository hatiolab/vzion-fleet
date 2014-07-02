Ext.define('Base.view.property.PropertyGrid', {
	
	extend : 'Ext.grid.property.Grid',
	
	xtype : ['property_grid'],
	
	title : T('title.properties'),
	
	initComponent: function() {
		this.store = Ext.create('Base.store.Property');

		this.callParent();
		
		this.on('afterrender', function() {
			var grid = this;
		});
		
		this.on('beforepropertychange', function() {
			
		});
	}
});