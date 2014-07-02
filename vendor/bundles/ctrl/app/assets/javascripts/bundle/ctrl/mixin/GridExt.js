Ext.define('Ctrl.mixin.GridExt', {
	
	constructor : function(config) {
		Ext.override(Ext.grid.Panel, {
			enableColumnMove : false,
			sortableColumns : false
			// enableColumnResize : false
		});

		Ext.override(Ext.grid.column.Column, {
			menuDisabled : true
		});
	}
});